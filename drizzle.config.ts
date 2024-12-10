import { defineConfig } from 'drizzle-kit'
import path from 'path'

export default defineConfig({
  dialect: 'sqlite', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/db/schema.ts',
  casing: 'snake_case',
  introspect: {
    casing: 'camel',
  },
  dbCredentials: {
    url: path.join(__dirname, './data/weibo.db'),
  },
})
