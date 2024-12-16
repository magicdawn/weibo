import { eq } from 'drizzle-orm'
import { getCurrentDB, type UserSelect } from '../db'
import { userTable } from '../schema'

export const userDao = {
  async findOne(uid: number): Promise<UserSelect | undefined> {
    return await getCurrentDB().query.user.findFirst({ where: eq(userTable.uid, uid) })
  },
  async findAll() {
    return await getCurrentDB().query.user.findMany()
  },
}
