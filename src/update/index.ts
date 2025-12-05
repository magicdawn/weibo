import path from 'node:path'
import KeyvSqlite from '@keyv/sqlite'
import { and, asc, eq } from 'drizzle-orm'
import { isEqual, orderBy } from 'es-toolkit'
import Keyv from 'keyv'
import { getMiniBlog, transformMblog } from '../api/mblog'
import { appPaths, baseDebug } from '../common'
import { getCurrentDB } from '../db/db'
import { associateMblogTable, mblogTable, userTable } from '../db/schema'
import { downloadMblogImgs } from '../download'
import type { RawMblogItem } from '../api/types/mblog'

const debug = baseDebug.extend('update')

export async function updateMblogFor(uid: number) {
  const getExistingIdsAsc = async () => {
    const list1 = await getCurrentDB()
      .select({ id: mblogTable.id })
      .from(mblogTable)
      .where(eq(mblogTable.uid, uid))
      .orderBy(asc(mblogTable.id))

    const list2 = await getCurrentDB()
      .select({ id: associateMblogTable.id })
      .from(associateMblogTable)
      .where(eq(associateMblogTable.uid, uid))
      .orderBy(asc(associateMblogTable.id))

    return orderBy([...list1, ...list2], ['id'], ['asc']).map((x) => x.id)
  }

  {
    const existingIds = await getExistingIdsAsc()
    if (!existingIds.length) {
      debug('no existing mblog items, performing full-update for %s', uid)
      await performFullUpdate(uid)
    }
  }

  {
    debug('performing incremental-update for %s', uid)
    await performIncrementalUpdate(uid, await getExistingIdsAsc())
  }
}

/**
 * 增量更新
 */
async function performIncrementalUpdate(uid: number, existingIds: number[]) {
  let page = 1
  let sinceId: string | undefined
  let hasMore = true
  const items: RawMblogItem[] = []

  while (hasMore) {
    const { sinceId: nextSinceId, hasMore: nextHasMore, list, total } = await getMiniBlog(uid, page, sinceId)
    sinceId = nextSinceId
    hasMore = nextHasMore
    items.push(...list)
    page++

    // check overlap with existing ids
    {
      const existing = existingIds.slice(-20) // ASC, last 20
      const current = sortItems(items).map((x) => x.id)
      if (checkSequenceOverlap(existing, current)) {
        hasMore = false
      }
    }
  }

  const newItems = sortItems(items.filter((x) => !existingIds.includes(x.id)))

  // download
  {
    const user = await getCurrentDB().query.user.findFirst({ where: eq(userTable.uid, uid) })
    if (!user) throw new Error('user not found')
    for (const item of newItems) {
      await downloadMblogImgs(user!, transformMblog(item))
    }
  }

  for (const item of newItems) {
    await insertItemToDB(item, uid)
  }
}

/**
增量更新 load-more

existing-list
-5  -4   -3   -2    -1


取出 20项, 分成3项, 3项的,
pivot 有 17 种可能

for all possible pivots
  在 new-list 找到一样的 pivot 序列即可认为找到匹配, 可以停止 load-more
 */

const PIVOT_LEN = 5

function checkSequenceOverlap(existingLastIds: number[], currentIds: number[]) {
  if (existingLastIds.length < PIVOT_LEN) return false

  for (let end = existingLastIds.length - 1; end >= PIVOT_LEN - 1; end--) {
    const startIndex = end - (PIVOT_LEN - 1)
    const endIndex = end
    const pivot = existingLastIds.slice(startIndex, endIndex + 1)

    if (pivot.every((id) => currentIds.includes(id))) {
      const idx = currentIds.indexOf(pivot[0])
      const slice = currentIds.slice(idx, idx + PIVOT_LEN)
      if (isEqual(pivot, slice)) {
        return true
      }
    }
  }

  return false
}

function sortItems<T extends { id: number }>(items: T[]) {
  return orderBy(items, [(x) => x.id], ['asc'])
}

export function createCacheStore<V>(dbname: string, tableName?: string) {
  const keyvSqlite = new KeyvSqlite({
    uri: `sqlite://${path.join(appPaths.data, `${dbname}.keyv.db`)}`,
    table: tableName || 'cache',
    busyTimeout: 10000,
  })
  const keyv = new Keyv<V>({ store: keyvSqlite })
  return keyv
}

const fullUpdateCache = createCacheStore<FullUpdateState>('full-update')

type FullUpdateState = {
  page: number
  sinceId: string | undefined
  hasMore: boolean
  items: RawMblogItem[]
}

/**
 * 全量更新, 支持断点续传
 */
async function performFullUpdate(uid: number) {
  let page = 1
  let sinceId: string | undefined
  let hasMore = true
  let items: RawMblogItem[] = []

  // 断点续传
  const cacheKey = uid.toString()
  if (await fullUpdateCache.has(cacheKey)) {
    const state = await fullUpdateCache.get(cacheKey)
    if (state) {
      page = state.page
      sinceId = state.sinceId
      hasMore = state.hasMore
      items = state.items
    }
  }

  while (hasMore) {
    const { sinceId: nextSinceId, hasMore: nextHasMore, list, total } = await getMiniBlog(uid, page, sinceId)
    sinceId = nextSinceId
    hasMore = nextHasMore
    items.push(...list)
    page++

    // save cache
    const newState: FullUpdateState = {
      page,
      sinceId,
      hasMore,
      items,
    }
    await fullUpdateCache.set(cacheKey, newState)
  }

  items = sortItems(items)

  // download
  {
    const user = await getCurrentDB().query.user.findFirst({ where: eq(userTable.uid, uid) })
    if (!user) throw new Error('user not found')
    for (const item of items) {
      await downloadMblogImgs(user, transformMblog(item))
    }
  }

  // cache -> db
  for (const item of items) {
    await insertItemToDB(item, uid)
  }
  await fullUpdateCache.delete(cacheKey)
}

async function insertItemToDB(item: RawMblogItem, uid: number) {
  const transformedItem = transformMblog(item)

  const belongsToCurrentUser = transformedItem.uid === uid
  if (belongsToCurrentUser) {
    return await getCurrentDB()
      .insert(mblogTable)
      .values(transformedItem)
      .onConflictDoUpdate({
        target: mblogTable.id,
        set: {
          uid: transformedItem.uid,
          text: transformedItem.text,
          picUrls: transformedItem.picUrls,
          isRepost: transformedItem.isRepost,
          mblogid: transformedItem.mblogid,
          raw: transformedItem.raw,
          mblogCreatedAt: transformedItem.mblogCreatedAt,
        },
        setWhere: eq(mblogTable.id, transformedItem.id),
      })
  }

  // uid 时间线上不属于他的微博
  // console.log('uid mismatch: uid=%s, transformedItem=%O', uid, transformedItem)
  return await getCurrentDB()
    .insert(associateMblogTable)
    .values({ ...transformedItem, uid }) // 此表 uid 表示关联的 uid, 并不是微博作者的 uid
    .onConflictDoUpdate({
      target: [associateMblogTable.id, associateMblogTable.uid],
      set: {
        text: transformedItem.text,
        picUrls: transformedItem.picUrls,
        isRepost: transformedItem.isRepost,
        mblogid: transformedItem.mblogid,
        raw: transformedItem.raw,
        mblogCreatedAt: transformedItem.mblogCreatedAt,
      },
      setWhere: and(eq(associateMblogTable.id, transformedItem.id), eq(associateMblogTable.uid, uid)),
    })
}
