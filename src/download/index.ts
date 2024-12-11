import path from 'node:path'
import type { TransformedMblog } from '../api/mblog'
import type { UserSelect } from '../db/db'
import { dayjs } from '../libs'
import filenamify from 'filenamify'
import dl from 'dl-vampire'
import { WEIBO_COOKIE } from '../pptr'
import logSymbols from 'log-symbols'
import pmap from 'promise.map'
import process from 'node:process'

export async function downloadMblogImgs(user: UserSelect, mblog: TransformedMblog) {
  if (mblog.isRepost) {
    return
  }

  const baseDir = process.cwd()
  const nickname = user.nickname || user.uid.toString()
  const isSelfContent = user.uid === mblog.uid
  const nicknameDir = isSelfContent ? nickname : `${nickname}_associated`
  const dir = path.join(baseDir, './imgs/', nicknameDir)

  const date = dayjs(mblog.mblogCreatedAt).format('YYYY-MM-DD HH_mm_ss')
  const text = mblog.text.toWellFormed().replace(/\s+/g, ' ').slice(0, 150)

  const queue: [index: number, url: string][] = []
  for (const [index, picUrl] of mblog.picUrls.entries()) {
    const { pic, livephoto } = picUrl
    const urls = [pic, livephoto].filter((x) => typeof x !== 'undefined').filter((x) => !!x)
    urls.forEach((url) => {
      queue.push([index, url])
    })
  }

  await pmap(
    queue,
    async ([index, url]) => {
      const ext = path.extname(new URL(url).pathname) || '.jpg'
      const indexStr = 'P' + (index + 1).toString().padStart(2, '0')
      const basename = isSelfContent
        ? filenamify(`${date} ${text} ${indexStr}${ext}`, { maxLength: Infinity })
        : filenamify(
            `${date} @${mblog.raw.user.screen_name} ${text} [${mblog.mblogid}] ${indexStr}${ext}`,
            { maxLength: Infinity },
          )
      const file = path.join(dir, basename)

      const { skip } = await dl({
        url,
        file,
        requestOptions: {
          headers: {
            referer: 'https://weibo.com/',
            cookie: WEIBO_COOKIE,
          },
        },
        retry: {
          times: 5,
          timeout: 2 * 60_000,
        },
      })
      console.log(
        `${logSymbols.success} dl %s %s`,
        skip ? 'skip' : 'success',
        path.relative(baseDir, file),
      )
    },
    6,
  )
}
