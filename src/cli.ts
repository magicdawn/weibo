#!/usr/bin/env tsx

import { browser, startPptr, WEIBO_COOKIE } from './pptr'
import { delay } from 'es-toolkit'
import ms from 'ms'
import path from 'path'
import { fse } from './libs'
import { initDb } from './db/db'
import { eq } from 'drizzle-orm'
import { userTable } from './db/schema'
import { getUserProfile, transformUser } from './api/user-info'
import createDebug from 'debug'
import { updateMblogFor } from './update'

createDebug.enable('weibo:*')
createDebug.enable('weibo:*,-weibo:api:detail:*')

// TODO: add cli commands
// - update for uid
// - list users
// - set user.scheduleUpdate
// - update all scheduleUpdate = true users

async function ensureCookie() {
  await startPptr({ headless: true })
  await browser.close()
  if (!WEIBO_COOKIE) {
    await startPptr({ headless: false })
    console.error('cookie not found, please login first, then restart the app')
    await delay(ms('1d')) // wait login, never go next
    process.exit(1)
  }
}

async function updateFor(uid: number) {
  const dbfile = path.resolve('./weibo.db')
  if (!fse.existsSync(dbfile)) {
    const templateDBFile = path.join(import.meta.dirname, '../data/weibo.db')
    fse.copyFileSync(templateDBFile, dbfile)
  }

  const db = initDb(dbfile)
  console.log('init db', dbfile)

  const user = await db.query.user.findFirst({ where: eq(userTable.uid, uid) })
  if (!user) {
    const rawUser = await getUserProfile(uid)
    const transformedUser = transformUser(rawUser)
    console.log('create user: %s, name: %s', uid, transformedUser.nickname)
    await db.insert(userTable).values(transformedUser)
  }

  await updateMblogFor(uid)
}

const argv = process.argv.slice(2)
if (argv.length > 0) {
  await ensureCookie()
  for (const arg of argv) {
    await updateFor(Number(arg))
  }
}
