import { baseDebug } from '../common'
import { handleRateLimitError, request } from './shared'
import type { MblogJson, RawMblogItem } from './types/mblog'

const debug = baseDebug.extend('api:mblog')
const debugDetail = baseDebug.extend('api:detail:mblog')

export async function getMiniBlog(uid: number | string, page: number, paramSinceId?: string) {
  debugDetail('getMiniBlog(): uid=%s, page=%s, sinceId=%s', uid, page, paramSinceId)
  // https://weibo.com/ajax/statuses/mymblog?uid=5796662600&page=1&feature=0
  const res = await handleRateLimitError('getMiniBlog()', () =>
    request.get<MblogJson>('/ajax/statuses/mymblog', {
      params: {
        uid,
        page,
        feature: 0,
        since_id: paramSinceId || '',
      },
    }),
  )
  const json = res.data
  debugDetail('getMiniBlog():', json)

  const { since_id: sinceId, list, total, bottom_tips_visible, bottom_tips_text } = json.data
  const hasMore = !!(sinceId && !bottom_tips_visible && !bottom_tips_text)
  debug(
    'getMiniBlog() success: uid=%s, page=%s, sinceId=%s; hasMore=%s nextSinceId=%s',
    uid,
    page,
    sinceId,
    hasMore,
    sinceId,
  )

  return {
    sinceId,
    list,
    total,
    hasMore,
  }
}

export type TransformedMblog = ReturnType<typeof transformMblog>

export function transformMblog(mblog: RawMblogItem) {
  return {
    // 数字 id, 如 4994486275146855, 还在 JavaScript Number.MAX_SAFE_INTEGER 之内
    id: mblog.id,
    uid: mblog.user.id,

    // 图文
    text: mblog.text_raw,
    picUrls: mblog.pic_ids.map((picId) => {
      const info = mblog.pic_infos![picId]
      if (info.type === 'livephoto') {
        return {
          livephoto: info.video!, // 有效期 1 小时, 需及时下载
          pic: info.largest.url,
        }
      } else {
        return {
          pic: info.largest.url,
        }
      }
    }),

    // attr
    isRepost: !!mblog.retweeted_status, // 是否转发

    // 字母 id, 如 NDE1dlAVN, 链接 https://weibo.com/1/NDE1dlAVN, 中间 `1` 为 uid, 但可以是任意 uid, 只是为了凑成路由; 猜测可能是 id 的某一种 encoding
    mblogid: mblog.mblogid,
    mblogCreatedAt: new Date(mblog.created_at),

    // backup
    raw: mblog,
  }
}
