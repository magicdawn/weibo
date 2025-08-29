import axios, { AxiosError, type AxiosResponse } from 'axios'
import { delay } from 'es-toolkit'
import { ProxyAgent } from 'proxy-agent'
import { tryit } from 'radash'
import { baseDebug } from '../common'
import { CLIENT_VERSION, SERVER_VERSION, WEIBO_COOKIE } from '../pptr'

const debug = baseDebug.extend('api:shared')

export const proxyAgent = new ProxyAgent()

export const request = axios.create({
  baseURL: 'https://weibo.com',
  timeout: 10000,
  adapter: 'fetch',
  httpAgent: proxyAgent,
  httpsAgent: proxyAgent,
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
  },
})

request.interceptors.request.use((config) => {
  const extraHeaders = getExtraHeaders({
    clientVersion: CLIENT_VERSION,
    serverVersion: SERVER_VERSION,
    cookie: WEIBO_COOKIE,
  })
  for (const [key, value] of Object.entries(extraHeaders)) {
    config.headers.set(key, value)
  }
  return config
})

function getExtraHeaders({
  clientVersion,
  serverVersion,
  cookie,
}: {
  clientVersion: string
  serverVersion: string
  cookie: string
}) {
  return {
    'client-version': clientVersion,
    'server-version': serverVersion,
    'x-xsrf-token': getXsrfToken(cookie),
    cookie,
  }
}
function getXsrfToken(cookie: string) {
  return (
    (cookie || '')
      .split(';')
      .find((x) => x.startsWith('XSRF-TOKEN='))
      ?.split('=')[1] ?? ''
  )
}

// 访问过于频繁，请稍等再试 错误码：414
export function rateLimitReached(statusCode: number, text: string) {
  return statusCode === 414 && text.includes('访问过于频繁，请稍等再试')
}

export async function handleRateLimitError<T extends unknown[], R extends AxiosResponse>(
  fnlabel: string,
  fn: (...args: T) => Promise<R>,
  ...args: T
) {
  const isRateLimitError = (err: Error) =>
    err instanceof AxiosError && err.response && rateLimitReached(err.response.status, err.response.data.toString())

  let waitInterval = 5_000
  const maxWaitInterval = 60_000

  let [err, res] = await tryit(fn)(...args)
  while (err && isRateLimitError(err)) {
    waitInterval *= 2
    if (waitInterval > maxWaitInterval) waitInterval = maxWaitInterval
    debug('rate limit reached in %s, waiting for %d seconds...', fnlabel, waitInterval / 1000)
    await delay(waitInterval)
    ;[err, res] = await tryit(fn)(...args)
  }

  return res!
}
