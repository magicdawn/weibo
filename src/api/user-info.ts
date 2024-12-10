import { baseDebug } from '../common'
import { handleRateLimitError, request } from './shared'
import type { RawUserProfile, UserProfileJson } from './types/user-info'

const debugDetail = baseDebug.extend('api:detail:user-info')

export async function getUserProfile(uid: number | string) {
  const res = await handleRateLimitError('getUserProfile()', () =>
    request.get<UserProfileJson>('/ajax/profile/info', {
      params: { uid },
    }),
  )
  const json = res.data
  debugDetail('getUserProfile', json)
  return json.data.user
}

export function transformUser(raw: RawUserProfile) {
  // clean up
  const u = new URL(raw.avatar_hd)
  u.search = ''
  u.hash = ''
  const avatar = u.href

  return {
    uid: raw.id,
    nickname: raw.screen_name,
    avatar,
    gender: raw.gender,
    location: raw.location,
    verifiedReason: raw.verified_reason,
    description: raw.description,
    raw,
  }
}
