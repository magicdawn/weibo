export interface MblogJson {
  data: MblogJsonData
  ok: number
}

export interface MblogJsonData {
  since_id: string
  list: RawMblogItem[]
  status_visible: number
  bottom_tips_visible: boolean
  bottom_tips_text: string
  topicList: any[]
  total: number
}

export interface RawMblogItem {
  visible: Visible
  created_at: string
  id: number
  idstr: string
  mid: string
  mblogid: string
  user: ListUser
  can_edit: boolean
  textLength?: number
  annotations: Array<any[] | AnnotationAnnotation>
  source: string
  favorited: boolean
  rid: string
  cardid?: string
  pic_ids: string[]
  pic_num: number
  pic_infos?: ListPicInfos
  is_paid: boolean
  pic_bg_new: string
  mblog_vip_type: number
  number_display_strategy: NumberDisplayStrategy
  title_source?: TitleSource
  reposts_count: number
  comments_count: number
  attitudes_count: number
  attitudes_status: number
  isLongText: boolean
  mlevel: number
  content_auth: number
  is_show_bulletin: number
  comment_manage_info: CommentManageInfo
  screen_name_suffix_new?: ScreenNameSuffixNew[]
  share_repost_type: number
  topic_struct?: TopicStruct[]
  url_struct?: URLStruct[]
  mblogtype: number
  showFeedRepost: boolean
  showFeedComment: boolean
  pictureViewerSign: boolean
  showPictureViewer: boolean
  rcList: any[]
  can_remark?: boolean
  common_struct?: ListCommonStruct[]
  analysis_extra: string
  readtimetype: Readtimetype
  mixed_count: number
  is_show_mixed: boolean
  mblog_feed_back_menus_format: any[]
  isSinglePayAudio: boolean
  text: string
  text_raw: string
  region_name?: string
  mark?: string
  continue_tag?: ContinueTag
  page_info?: ListPageInfo
  repost_type?: number
  title?: Title
  retweeted_status?: RetweetedStatus
  buttons?: ListButton[]
  followBtnCode?: FollowBtnCode
  geo?: Geo
  tag_struct?: TagStruct[]
  mix_media_info?: MixMediaInfo
  edit_count?: number
}

export interface AnnotationAnnotation {
  photo_sub_type?: string
  client_mblogid?: string
  source_text?: string
  phone_id?: string
  mapi_request?: boolean
  super_exparams?: string
  spot_type?: string
  place?: Place
  filterID?: string
  shooting?: number
}

export interface Place {
  poiid: string
  title: string
  type: string
  spot_type: string
}

export interface ListButton {
  type: ButtonType
  name: string
  pic: string
  params: FollowBtnCode
  actionlog: PurpleActionlog
}

export interface PurpleActionlog {
  act_code: number
  uicode: string
  oid: string
  cardid: string
}

export interface FollowBtnCode {
  uid: number
}

export type ButtonType = 'follow' | 'link'

export interface CommentManageInfo {
  comment_permission_type: number
  approval_comment_type: number
  comment_sort_type: number
  ai_play_picture_type?: number
}

export interface ListCommonStruct {
  url: string
  name: string
  desc: string
  img: string
  type: number
  btn_show_type?: string
  page_id: string
  actionlog: CommonStructActionlog
  buttons: PurpleButton[]
  hidden?: number
}

export interface CommonStructActionlog {
  act_code: string
  uid: string
  mid: number
  oid: string
  uicode: string
  cardid: string
  fid: string
  luicode: string
  lfid: string
  ext: string
  source: PurpleSource
  shop_window_scene?: string
  act_type?: number
  code?: string
  mark?: string
}

export type PurpleSource = 'wbcc_product' | 'ad'

export interface PurpleButton {
  name: ButtonName
  pic: string
  type: ButtonType
  params: PurpleParams
  actionlog: FluffyActionlog
}

export interface FluffyActionlog {
  act_code: number | string
  uid: string
  mid: number
  oid: string
  uicode: string
  cardid: string
  fid: string
  luicode: string
  lfid: string
  ext: string
  source: PurpleSource
  shop_window_scene?: string
  act_type?: number
  code?: string
  mark?: string
}

export type ButtonName = '关注' | '查看结果'

export interface PurpleParams {
  uid?: string
  scheme: string
  type?: 'page'
  cleaned: boolean
}

export interface ContinueTag {
  title: string
  pic: string
  scheme: string
  cleaned: boolean
}

export interface Geo {
  type: string
  coordinates: number[]
}

export interface MixMediaInfo {
  items: Item[]
}

export interface Item {
  type: ItemType
  id: string
  data: ItemData
  scheme: string
  actionlog: any[] | ActionlogActionlog
}

export interface ActionlogActionlog {
  act_type: number
  act_code: number
  lcardid: string
  fid: string
  mid: string
  oid: string
  uuid: number
  source: ObjectTypeEnum
  ext: string
  code?: string
  mark?: string
}

export type ObjectTypeEnum = 'video' | 'ad'

export interface ItemData {
  thumbnail?: Bmiddle
  bmiddle?: Bmiddle
  large?: Bmiddle
  original?: Bmiddle
  largest?: Bmiddle
  mw2000?: Bmiddle
  largecover?: Bmiddle
  object_id: string
  pic_id?: string
  photo_tag?: number
  sticker_id?: string
  filter_id?: string
  template_id?: string
  type: string
  pic_status?: number
  button_name?: string
  button_scheme?: string
  page_id?: string
  object_type?: ObjectTypeEnum
  content1?: string
  content2?: string
  act_status?: number
  media_info?: DataMediaInfo
  page_pic?: string
  page_title?: string
  page_url?: string
  pic_info?: DataPicInfo
  oid?: string
  type_icon?: string
  author_id?: string
  authorid?: string
  warn?: string
  actionlog?: ActionlogActionlog
  short_url?: string
  video?: string
  fid?: string
}

export interface Bmiddle {
  url: string
  width: number
  height: number
  cut_type: number
  type: null | string
}

export interface DataMediaInfo {
  name: string
  stream_url: string
  stream_url_hd: string
  format: string
  h5_url: string
  mp4_sd_url: string
  mp4_hd_url: string
  h265_mp4_hd: string
  h265_mp4_ld: string
  inch_4_mp4_hd: string
  inch_5_mp4_hd: string
  inch_5_5_mp4_hd: string
  mp4_720p_mp4: string
  hevc_mp4_720p: string
  prefetch_type: number
  prefetch_size: number
  act_status: number
  protocol: string
  media_id: string
  origin_total_bitrate: number
  video_orientation: string
  duration: number
  forward_strategy: number
  search_scheme: string
  is_short_video: number
  vote_is_show: number
  belong_collection: number
  titles_display_time: string
  show_progress_bar: number
  show_mute_button: boolean
  ext_info: EXTInfo
  next_title: string
  kol_title: string
  play_completion_actions: PurplePlayCompletionAction[]
  video_publish_time: number
  play_loop_type: number
  author_mid: string
  author_name: string
  extra_info: ExtraInfo
  video_download_strategy: VideoDownloadStrategy
  jump_to: number
  big_pic_info: BigPicInfo
  online_users: string
  online_users_number: number
  ttl: number
  storage_type: StorageType
  playback_list?: PlaybackList[]
}

export interface BigPicInfo {
  pic_big: BigPicInfoPicBig
  pic_small: BigPicInfoPicBig
  pic_middle: BigPicInfoPicBig
}

export interface BigPicInfoPicBig {
  height: number
  url: string
  width: number
}

export interface EXTInfo {
  video_orientation: string
}

export interface ExtraInfo {
  sceneid: string
}

export interface PurplePlayCompletionAction {
  type: number | string
  icon: string
  text: string
  link: string
  btn_code: number
  show_position: number
  actionlog: TentacledActionlog
  display_mode?: number
  display_starttime?: number
  display_endtime?: number
  countdown_time?: number
  scheme?: string
  ext?: EXTClass
  display_type?: number
}

export interface TentacledActionlog {
  oid: string
  act_code: number
  act_type: number
  source: ObjectTypeEnum
  ext?: string
}

export interface EXTClass {
  uid: string
  user_name: string
  followers_count: number
  verified: boolean
  verified_type: number
  verified_type_ext: number
  verified_reason: string
  level: number
}

export interface PlaybackList {
  meta: Meta
  play_info: PlayInfo
}

export interface Meta {
  label: string
  quality_index: number
  quality_desc: QualityDesc
  quality_label: string
  quality_class: QualityClass
  type: number
  quality_group: number
  is_hidden: boolean
}

export type QualityClass = 'HD' | 'SD'

export type QualityDesc = '高清' | '标清' | '流畅'

export interface PlayInfo {
  type: number
  mime: MIME
  protocol: 'general'
  label: string
  url: string
  bitrate?: number
  prefetch_range: string
  video_codecs?: VideoCodecs
  fps?: number
  width: number
  height: number
  size?: number
  duration?: number
  sar?: string
  audio_codecs?: 'mp4a.40.5'
  audio_sample_rate?: number
  quality_label: string
  quality_class: QualityClass
  quality_desc: QualityDesc
  audio_channels?: number
  audio_sample_fmt?: 'fltp'
  audio_bits_per_sample?: number
  watermark?: 'original'
  extension: Extension
  video_decoder: 'hard'
  prefetch_enabled: boolean
  tcp_receive_buffer: number
  dolby_atmos?: boolean
  color_transfer?: 'bt709'
  stereo_video?: number
  first_pkt_end_pos?: number
  col?: number
  row?: number
  interval?: number
  offset?: number
  urls?: string[]
}

export interface Extension {
  transcode_info: TranscodeInfo
}

export interface TranscodeInfo {
  pcdn_rule_id: number
  pcdn_jank: number
  origin_video_dr: 'SDR'
  ab_strategies: string
}

export type MIME = 'video/mp4' | 'image/jpeg'

export type VideoCodecs = 'avc1.64001f' | 'avc1.64001e' | 'avc1.640032'

export type StorageType = '' | 'oss'

export interface VideoDownloadStrategy {
  abandon_download: number
}

export interface DataPicInfo {
  pic_big: PicInfoPicBig
  pic_small: PicInfoPicBig
  pic_middle: PicInfoPicBig
}

export interface PicInfoPicBig {
  height: string
  url: string
  width: string
}

export type ItemType = 'pic' | 'video'

export interface NumberDisplayStrategy {
  apply_scenario_flag: number
  display_text_min_number: number
  display_text: string
}

export interface ListPageInfo {
  type: number | string
  page_id: string
  object_type: string
  oid?: string
  page_title: string
  page_pic?: string
  type_icon: string
  page_url: string
  object_id: string
  media_info?: FluffyMediaInfo
  author_id?: string
  authorid?: string
  cards?: Card[]
  actionlog: Log
  short_url?: string
  page_desc?: string
  card_info?: CardInfo
  scheme?: string
  page_pc_url?: string
  cleaned?: boolean
}

export interface Log {
  act_type: number
  act_code: number
  lcardid: string
  fid: string
  mid?: string
  oid: string
  uuid: number
  source?: ObjectTypeEnum
  ext: string
  cardid?: string
  uicode?: string
  luicode?: string
  lfid?: string
}

export interface CardInfo {
  card_type: string
  page_info: CardInfoPageInfo
  title: string
  title_color_type: string
  pic_url: string
  sub_type: string
  scheme: string
  cleaned: boolean
}

export interface CardInfoPageInfo {
  pic_info: PageInfoPicInfo
  type: string
  page_url: string
  object_id: string
  media_info: PurpleMediaInfo
}

export interface PurpleMediaInfo {
  stream_url: string
  autoplay: string
}

export interface PageInfoPicInfo {
  pic_big: PicInfoPicBig
  pic_middle: PicInfoPicBig
}

export interface Card {
  type: number | string
  page_id: string
  object_type: string
  object_id: string
  content1?: string
  content2?: string
  act_status?: number
  media_info?: CardMediaInfo
  page_pic?: string
  page_title: string
  page_url: string
  pic_info?: DataPicInfo
  oid?: string
  type_icon: string
  author_id?: string
  authorid?: string
  warn?: string
  actionlog: ActionlogActionlog
  card_category?: string
  display_name?: 'AI总结'
  total_abstract?: string
  split_abstract?: SplitAbstract[]
  sync_like?: number
  async_media_abstract?: number
  split_action_log?: Log
  split_exposure_log?: Log
}

export interface CardMediaInfo {
  name: string
  stream_url: string
  stream_url_hd: string
  format: string
  h5_url: string
  mp4_sd_url: string
  mp4_hd_url: string
  h265_mp4_hd: string
  h265_mp4_ld: string
  inch_4_mp4_hd: string
  inch_5_mp4_hd: string
  inch_5_5_mp4_hd: string
  mp4_720p_mp4: string
  hevc_mp4_720p: string
  prefetch_type: number
  prefetch_size: number
  act_status: number
  protocol: string
  media_id: string
  origin_total_bitrate: number
  video_orientation: string
  duration: number
  forward_strategy: number
  search_scheme: string
  is_short_video: number
  vote_is_show: number
  belong_collection: number
  titles_display_time: string
  show_progress_bar: number
  show_mute_button: boolean
  ext_info: EXTInfo
  next_title: string
  kol_title: string
  play_completion_actions: FluffyPlayCompletionAction[]
  video_publish_time: number
  play_loop_type: number
  video_title: string
  author_mid: string
  author_name: string
  extra_info: ExtraInfo
  video_download_strategy: VideoDownloadStrategy
  jump_to: number
  big_pic_info: BigPicInfo
  online_users: string
  online_users_number: number
  ttl: number
  storage_type: StorageType
}

export interface FluffyPlayCompletionAction {
  type: number | string
  icon?: string
  text?: string
  link?: string
  btn_code?: number
  show_position?: number
  actionlog: ActionlogElement
  display_duration?: number
  music_link?: string
  sound_switch?: string
  profile_scheme?: string
}

export interface ActionlogElement {
  oid: string
  act_code?: number | string
  act_type: number
  source: PurpleSource
  mid: string
  code: string
  mark: string
  ext?: string
  atype?: string
}

export interface SplitAbstract {
  object_type: 'media_abstract_fragment'
  abstract_mid: string
  abstract_id: string
  end_time: number
  begin_time: number
  id: string
  text: string
  author_id: string
  display_name: 'AI总结'
  author_mid: string
  abstract_url: string
  url: string
}

export interface FluffyMediaInfo {
  name: string
  stream_url: string
  stream_url_hd: string
  format: string
  h5_url: string
  mp4_sd_url: string
  mp4_hd_url: string
  h265_mp4_hd: string
  h265_mp4_ld: string
  inch_4_mp4_hd: string
  inch_5_mp4_hd: string
  inch_5_5_mp4_hd: string
  mp4_720p_mp4: string
  hevc_mp4_720p: string
  prefetch_type: number
  prefetch_size: number
  act_status: number
  protocol: string
  media_id: string
  origin_total_bitrate: number
  video_orientation: string
  duration: number
  forward_strategy: number
  search_scheme: string
  is_short_video: number
  vote_is_show: number
  belong_collection: number
  titles_display_time: string
  show_progress_bar: number
  show_mute_button: boolean
  ext_info: EXTInfo
  next_title: string
  kol_title: string
  play_completion_actions: TentacledPlayCompletionAction[]
  video_publish_time: number
  play_loop_type: number
  video_title: string
  author_mid: string
  author_name: string
  extra_info: ExtraInfo
  video_download_strategy: VideoDownloadStrategy
  jump_to: number
  big_pic_info: BigPicInfo
  online_users: string
  online_users_number: number
  ttl: number
  storage_type: StorageType
  is_keep_current_mblog: number
  author_info: AuthorInfo
  playback_list: PlaybackList[]
}

export interface AuthorInfo {
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
  status_total_counter: AuthorInfoStatusTotalCounter
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
}

export interface AuthorInfoStatusTotalCounter {
  total_cnt_format: string
  comment_cnt: string
  repost_cnt: string
  like_cnt: string
  total_cnt: string
}

export interface TentacledPlayCompletionAction {
  type: number | string
  icon?: string
  text?: string
  link?: string
  btn_code?: number
  show_position?: number
  actionlog: StickyActionlog
  display_duration?: number
  music_link?: string
  sound_switch?: string
  profile_scheme?: string
}

export interface StickyActionlog {
  oid: string
  act_code: number | string
  act_type: number
  source: ObjectTypeEnum
}

export interface ListPicInfos {
  [key: string]: The4_F4D6Da5Gy1I2G34L9Ssfj21801Mo7H4 | The007_SiMsbly8I2G4Ckwr9Tj30U01Hcx1Z
}

export interface The007_SiMsbly8I2G4Ckwr9Tj30U01Hcx1Z {
  thumbnail: Bmiddle
  bmiddle: Bmiddle
  large: Bmiddle
  original: Bmiddle
  largest: Bmiddle
  mw2000: Bmiddle
  largecover: Bmiddle
  object_id: string
  pic_id: string
  photo_tag: number
  type: The007SiMsbly8I2G4Ckwr9Tj30U01Hcx1ZType
  pic_status: number
  video?: string
  fid?: string
  video_object_id?: string
  filter_id?: string
  button_name?: string
  button_scheme?: string
  actionlog?: ActionlogElement[]
}

export type The007SiMsbly8I2G4Ckwr9Tj30U01Hcx1ZType = 'pic' | 'livephoto' | 'gif'

export interface The4_F4D6Da5Gy1I2G34L9Ssfj21801Mo7H4 {
  thumbnail: Bmiddle
  bmiddle: Bmiddle
  large: Bmiddle
  original: Bmiddle
  largest: Bmiddle
  mw2000: Bmiddle
  largecover: Bmiddle
  object_id: string
  pic_id: string
  photo_tag: number
  type: The007SiMsbly8I2G4Ckwr9Tj30U01Hcx1ZType
  video?: string
  fid?: string
  pic_status: number
}

export type Readtimetype = 'mblog' | 'adMblog'

export interface RetweetedStatus {
  visible: Visible
  created_at: string
  id: number
  idstr: string
  mid: string
  mblogid: string
  user: RetweetedStatusUser
  can_edit: boolean
  textLength: number
  annotations: RetweetedStatusAnnotation[]
  source: string
  favorited: boolean
  mark: string
  rid: string
  cardid: string
  pic_ids: string[]
  geo: string
  pic_num: number
  is_paid: boolean
  mblog_vip_type: number
  number_display_strategy: NumberDisplayStrategy
  reposts_count: number
  comments_count: number
  attitudes_count: number
  attitudes_status: number
  continue_tag: ContinueTag
  isLongText: boolean
  mlevel: number
  content_auth: number
  is_show_bulletin: number
  comment_manage_info: CommentManageInfo
  mblogtype: number
  showFeedRepost: boolean
  showFeedComment: boolean
  pictureViewerSign: boolean
  showPictureViewer: boolean
  rcList: any[]
  common_struct?: RetweetedStatusCommonStruct[]
  mixed_count: number
  is_show_mixed: boolean
  mblog_feed_back_menus_format: any[]
  isSinglePayAudio: boolean
  text: string
  text_raw: string
  region_name: string
  buttons?: RetweetedStatusButton[]
  pic_infos?: RetweetedStatusPicInfos
}

export interface RetweetedStatusAnnotation {
  mapi_request?: boolean
  photo_sub_type?: string
  client_mblogid?: string
  source_text?: string
  phone_id?: string
}

export interface RetweetedStatusButton {
  type: ButtonType
  name: string
  params: FluffyParams
  actionlog: IndigoActionlog
}

export interface IndigoActionlog {
  act_code: string
  oid: string
}

export interface FluffyParams {
  uid: number
  disable_group: number
  extparams: Extparams
}

export interface Extparams {
  followcardid: string
}

export interface RetweetedStatusCommonStruct {
  name: string
  url: string
  desc: string
  img: string
  type: number
  page_id: string
  actionlog: CommonStructActionlog
  buttons: FluffyButton[]
}

export interface FluffyButton {
  name: ButtonName
  pic: string
  type: ButtonType
  params: TentacledParams
  actionlog: CommonStructActionlog
}

export interface TentacledParams {
  scheme: string
  cleaned: boolean
}

export interface RetweetedStatusPicInfos {
  '007YRbdYgy1i2rs9skymrj318gbnkkjs': The007_SiMsbly8I2G4Ckwr9Tj30U01Hcx1Z
}

export interface RetweetedStatusUser {
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
  status_total_counter: PurpleStatusTotalCounter
  avatar_large: string
  avatar_hd: string
  follow_me: boolean
  following: boolean
  mbrank: number
  mbtype: number
  v_plus: number
  user_ability: number
  planet_video: boolean
  icon_list: IconList[]
}

export interface IconList {
  type: 'vip'
  data: IconListData
}

export interface IconListData {
  mbrank: number
  mbtype: number
  svip: number
  vvip: number
}

export interface PurpleStatusTotalCounter {
  total_cnt_format: string | number
  comment_cnt: string
  repost_cnt: string
  like_cnt: string
  total_cnt: string
}

export interface Visible {
  type: number
  list_id: number
}

export interface ScreenNameSuffixNew {
  content: string
  remark?: string
  color: string
  dark_color: string
  type: number
  icons?: Icon[]
  icons_location?: number
  truncation: Truncation
  scheme?: string
  actionlog?: ScreenNameSuffixNewActionlog
  cleaned?: boolean
}

export interface ScreenNameSuffixNewActionlog {
  act_code: number
  oid: string
  uicode: string
  luicode: string
  fid: string
  ext: string
}

export interface Icon {
  name?: 'vip'
  url: string
  scheme: string
  length?: number
  cleaned: boolean
  type?: 'chaohua'
}

export interface Truncation {
  mode: number
  keep_end_size?: number
}

export interface TagStruct {
  tag_name: string
  tag_scheme: string
  url_type_pic: string
  oid: string
  otype?: OtypeEnum
  tag_type: number
  tag_hidden: number
  ori_url?: string
  actionlog: ScreenNameSuffixNewActionlog
  desc?: string
  is_checkin?: number
  bd_object_type?: string
  w_h_ratio?: string
}

export type OtypeEnum = 'place' | ''

export interface Title {
  text: string
  structs: Struct[]
}

export interface Struct {
  name: string
  scheme: string
  cleaned: boolean
}

export interface TitleSource {
  name: string
  url: string
  image: string
}

export interface TopicStruct {
  title: string
  topic_url: string
  topic_title: string
  actionlog: Log
}

export interface URLStruct {
  url_title: string
  url_type_pic: string
  ori_url: string
  page_id?: string
  short_url: string
  long_url: string
  url_type: number | string
  result: boolean
  actionlog: URLStructActionlog
  storage_type: StorageType
  hide: number
  object_type?: OtypeEnum
  h5_target_url?: string
  need_save_obj: number
  ttl?: number
  position?: number
  log?: string
}

export interface URLStructActionlog {
  act_type: number
  act_code: number
  oid: string
  uuid: number | string
  cardid: string
  lcardid: string
  uicode: string
  luicode: string
  fid: string
  lfid: string
  ext: string
  mid?: string
  source?: PurpleSource
  code?: number | string
  mark?: string
  uid?: string
}

export interface ListUser {
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
  status_total_counter: AuthorInfoStatusTotalCounter
  avatar_large: string
  avatar_hd: string
  follow_me: boolean
  following: boolean
  mbrank: number
  mbtype: number
  v_plus: number
  user_ability: number
  planet_video: boolean
  icon_list: IconList[]
}
