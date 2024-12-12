import { assert } from 'console'
import { currentDB, type UserSelect } from '../db'
import { eq } from 'drizzle-orm'
import { userTable } from '../schema'

export const userDao = {
  async findOne(uid: number): Promise<UserSelect | undefined> {
    assert(currentDB, 'db not init')
    return await currentDB!.query.user.findFirst({ where: eq(userTable.uid, uid) })
  },
  async findAll() {
    return await currentDB!.query.user.findMany()
  },
}
