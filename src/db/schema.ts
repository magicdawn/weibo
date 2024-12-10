import { sql } from 'drizzle-orm'
import * as t from 'drizzle-orm/sqlite-core'
import { customType, sqliteTable } from 'drizzle-orm/sqlite-core'
import type { RawMblogItem } from '../api/types/mblog'
import type { RawUserProfile } from '../api/types/user-info'
import { dayjs } from '../libs'

const datetimeColumn = customType<{ data: Date; driverData: string }>({
  dataType() {
    // we need type `datetime` to use `numeric` type affinity
    return 'datetime'
  },
  fromDriver(timestamp: string) {
    return dayjs.utc(timestamp).toDate()
  },
  toDriver(date: Date) {
    return dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss')
  },
})

const sqlCurrentTimestamp = sql`(CURRENT_TIMESTAMP)`

export const userTable = sqliteTable(
  'user',
  {
    uid: t.integer({ mode: 'number' }).primaryKey().notNull(),
    nickname: t.text(),
    avatar: t.text(),
    gender: t.text(),
    location: t.text(),
    verifiedReason: t.text(),
    description: t.text(),
    raw: t.text({ mode: 'json' }).$type<RawUserProfile>(),
    // meta
    createdAt: datetimeColumn().default(sqlCurrentTimestamp),
    updatedAt: datetimeColumn()
      .default(sqlCurrentTimestamp)
      .$onUpdate(() => sqlCurrentTimestamp),
  },
  (table) => {
    return []
  },
)

export const mblogTable = sqliteTable(
  'mblog',
  {
    id: t.integer({ mode: 'number' }).primaryKey().notNull(),
    uid: t
      .integer({ mode: 'number' })
      .notNull()
      .references(() => userTable.uid),
    text: t.text(),
    picUrls: t.text({ mode: 'json' }).$type<Array<{ pic: string; livephoto?: string }>>(),
    isRepost: t.integer({ mode: 'boolean' }),
    mblogid: t.text(),
    raw: t.text({ mode: 'json' }).$type<RawMblogItem>(),
    mblogCreatedAt: datetimeColumn(),
    // meta
    createdAt: datetimeColumn().default(sqlCurrentTimestamp),
    updatedAt: datetimeColumn()
      .default(sqlCurrentTimestamp)
      .$onUpdate(() => sqlCurrentTimestamp),
  },
  (table) => {
    return [
      t.index('mblog_idx_isRepost').on(table.isRepost),
      t.index('mblog_idx_mblogCreatedAt').on(table.mblogCreatedAt),
      t.index('mblog_idx_uid').on(table.uid),
    ]
  },
)

/**
 * 用户的时间线上出现的不是原创微博, 而是点赞 / 超话微博
 */
export const associateMblogTable = sqliteTable(
  'associate_mblog',
  {
    id: t.integer({ mode: 'number' }).notNull(),
    uid: t.integer({ mode: 'number' }).notNull(), // not foreign key anymore, 作者可能不是库里的已知用户
    text: t.text(),
    picUrls: t.text({ mode: 'json' }).$type<Array<{ pic: string; livephoto?: string }>>(),
    isRepost: t.integer({ mode: 'boolean' }),
    mblogid: t.text(),
    raw: t.text({ mode: 'json' }).$type<RawMblogItem>(),
    mblogCreatedAt: datetimeColumn(),
    // meta
    createdAt: datetimeColumn().default(sqlCurrentTimestamp),
    updatedAt: datetimeColumn()
      .default(sqlCurrentTimestamp)
      .$onUpdate(() => sqlCurrentTimestamp),
  },
  (table) => {
    return [
      t.primaryKey({ columns: [table.id, table.uid] }),
      t.index('associate_mblog_idx_mblogCreatedAt').on(table.mblogCreatedAt),
      t.index('associate_mblog_idx_uid').on(table.uid),
      t.index('associate_mblog_idx_isRepost').on(table.isRepost),
    ]
  },
)
