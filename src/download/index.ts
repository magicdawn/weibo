import path from 'node:path'
import consola from 'consola'
import dl, { HTTPError, RetryError } from 'dl-vampire'
import { attemptAsync } from 'es-toolkit'
import filenamify from 'filenamify'
import logSymbols from 'log-symbols'
import pmap from 'promise.map'
import { COMMON_HEADERS } from '../api/shared'
import { dayjs } from '../libs'
import { WEIBO_COOKIE } from '../pptr'
import type { TransformedMblog } from '../api/mblog'
import type { UserSelect } from '../db/db'

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
  const text = mblog.text.toWellFormed().replaceAll(/\s+/g, ' ').slice(0, 150)

  const queue: [index: number, url: string][] = []
  for (const [index, picUrl] of mblog.picUrls.entries()) {
    const { pic, livephoto, video } = picUrl
    const urls = [pic, livephoto, video].filter(Boolean)
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
        : filenamify(`${date} @${mblog.raw.user.screen_name} ${text} [${mblog.mblogid}] ${indexStr}${ext}`, {
            maxLength: Infinity,
          })
      const file = path.join(dir, basename)

      const attemptDl = (useHeadRequestToFetchExpectSize?: boolean, cookie: boolean = true) => {
        return attemptAsync(() =>
          dl({
            url,
            file,
            useHeadRequestToFetchExpectSize,
            requestOptions: { headers: { ...COMMON_HEADERS, cookie: cookie ? WEIBO_COOKIE : undefined } },
            retry: { times: 5, timeout: 2 * 60_000 },
          }),
        )
      }

      let err: any
      let dlResult: { skip: boolean } | null
      ;[err, dlResult] = await attemptDl()
      if (!err) {
        console.log(`${logSymbols.success} dl %s %s`, dlResult?.skip ? 'skip' : 'success', path.relative(baseDir, file))
        return
      }

      if (
        err instanceof RetryError &&
        err.errors.every((x) => x instanceof HTTPError && x.response.statusCode === 403)
      ) {
        ;[err, dlResult] = await attemptDl(false) // no HEAD request
      }
      if (!err) {
        console.log(`${logSymbols.success} dl %s %s`, dlResult?.skip ? 'skip' : 'success', path.relative(baseDir, file))
        return
      }

      if (
        err instanceof RetryError &&
        err.errors.every((x) => x instanceof HTTPError && x.response.statusCode === 403)
      ) {
        ;[err, dlResult] = await attemptDl(false, false) // no HEAD request, no cookie
      }
      if (!err) {
        console.log(`${logSymbols.success} dl %s %s`, dlResult?.skip ? 'skip' : 'success', path.relative(baseDir, file))
        return
      }

      consola.error('err', err)
      // throw err
    },
    6,
  )
}
