export interface UserProfileJson {
  ok: number
  data: TopLevelData
}

export interface TopLevelData {
  user: RawUserProfile
  tabList: TabList[]
  blockText: string
}

export interface TabList {
  name: string
  tabName: string
}

export interface RawUserProfile {
  id: number
  idstr: string
  pc_new: number
  screen_name: string
  profile_image_url: string
  profile_url: string
  verified: boolean
  verified_type: number
  domain: string
  weihao: string
  verified_type_ext: number
  status_total_counter: StatusTotalCounter
  avatar_large: string
  avatar_hd: string
  follow_me: boolean
  following: boolean
  mbrank: number
  mbtype: number
  v_plus: number
  user_ability: number
  planet_video: boolean
  verified_reason: string
  description: string
  location: string
  gender: string
  followers_count: number
  followers_count_str: string
  friends_count: number
  statuses_count: number
  url: string
  svip: number
  vvip: number
  cover_image_phone: string
  icon_list: IconList[]
  top_user: number
  user_type: number
  is_star: string
  is_muteuser: boolean
  special_follow: boolean
}

export interface IconList {
  type: string
  data: IconListData
}

export interface IconListData {
  mbrank: number
  mbtype: number
  svip: number
  vvip: number
}

export interface StatusTotalCounter {
  total_cnt_format: string
  comment_cnt: string
  repost_cnt: string
  like_cnt: string
  total_cnt: string
}
