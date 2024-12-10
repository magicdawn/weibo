import { drizzle } from 'drizzle-orm/better-sqlite3'
import { mblogTable, userTable } from './schema'

export let currentDB: ReturnType<typeof initDb> | undefined

export function initDb(dbfile: string) {
  const db = drizzle(dbfile, {
    schema: { user: userTable, mblog: mblogTable },
    casing: 'snake_case',
  })
  currentDB = db
  return db
}

// helper types
export type UserSelect = typeof userTable.$inferSelect
export type UserInsert = typeof userTable.$inferInsert

export type MblogSelect = typeof mblogTable.$inferSelect
export type MblogInsert = typeof mblogTable.$inferInsert
