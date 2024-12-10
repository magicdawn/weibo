export interface MblogJson {
  data: TopLevelData
  ok: number
}

export interface TopLevelData {
  since_id: string
  list: RawMblogItem[]
  status_visible: number
  bottom_tips_visible: boolean
  bottom_tips_text: string
  topicList: any[]
  total: number
  hotCollection: HotCollection
}

export interface HotCollection {
  uid: string
  version2: Version2
}

export interface Version2 {
  title: string
  icon: string
  stat: Stat[]
  topic: Topic
}

export interface Stat {
  count: string
  label: string
  unit: string
}

export interface Topic {
  url: string
  text: string
  discussNum: string
  icon: string
}

export interface RawMblogItem {
  visible: Visible
  created_at: string
  id: number
  idstr: string
  mid: string
  mblogid: string
  user: User
  can_edit: boolean
  textLength?: number
  annotations: Array<any[] | AnnotationClass>
  source: string
  favorited: boolean
  rid: string
  cardid: Cardid
  pic_ids: string[]
  pic_focus_point?: PicFocusPoint[]
  pic_num: number
  pic_infos?: PicInfos
  is_paid: boolean
  pic_bg_new: string
  mblog_vip_type: number
  number_display_strategy: NumberDisplayStrategy
  reposts_count: number
  comments_count: number
  attitudes_count: number
  attitudes_status: number
  isLongText: boolean
  mlevel: number
  content_auth: number
  is_show_bulletin: number
  comment_manage_info: CommentManageInfo
  share_repost_type: number
  topic_struct: TopicStruct[]
  isTop?: number
  mblogtype: number
  showFeedRepost: boolean
  showFeedComment: boolean
  pictureViewerSign: boolean
  showPictureViewer: boolean
  rcList: any[]
  analysis_extra: AnalysisExtra
  readtimetype: Readtimetype
  mixed_count: number
  is_show_mixed: boolean
  isSinglePayAudio: boolean
  text: string
  text_raw: string
  region_name: string
  customIcons: any[]
  url_struct?: URLStruct[]
  page_info?: PageInfo
  tag_struct?: TagStruct[]
  mark?: Mark
  title?: Title
  repost_type?: number
  retweeted_status?: RetweetedStatus
  edit_count?: number
}

export enum AnalysisExtra {
  Follow1 = 'follow:1',
}

export interface AnnotationClass {
  photo_sub_type?: string
  client_mblogid?: string
  source_text?: string
  phone_id?: string
  mapi_request?: boolean
}

export enum Cardid {
  Star1618 = 'star_1618',
}

export interface CommentManageInfo {
  comment_permission_type: number
  approval_comment_type: number
  comment_sort_type: number
  ai_play_picture_type?: number
}

export enum Mark {
  Followtopweibo = 'followtopweibo',
  The999_ReallogMarkAd999WeiboADNatural = '999_reallog_mark_ad:999|WeiboADNatural',
}

export interface NumberDisplayStrategy {
  apply_scenario_flag: number
  display_text_min_number: number
  display_text: DisplayText
}

export enum DisplayText {
  The100万 = '100万+',
}

export interface PageInfo {
  type: number | string
  page_id: string
  object_type: ObjectType
  object_id: string
  content1?: string
  content2?: string
  act_status?: number
  media_info: PageInfoMediaInfo
  page_pic: string
  page_title: string
  page_url: string
  pic_info?: PicInfo
  oid: string
  type_icon: string
  author_id: string
  authorid: string
  warn?: string
  actionlog: PageInfoActionlog
  short_url: string
  cards?: Card[]
}

export interface PageInfoActionlog {
  act_type: number
  act_code: number
  lcardid: string
  fid: Fid
  mid: string
  oid: string
  uuid: number
  source: ObjectType
  ext: string
  code?: string
  mark?: Mark
}

export enum Fid {
  The1076035796662600__WeiboSecondProfileWeibo = '1076035796662600_-_WEIBO_SECOND_PROFILE_WEIBO',
}

export enum ObjectType {
  Ad = 'ad',
  Video = 'video',
}

export interface Card {
  type: number | string
  page_id: string
  object_type: ObjectType
  object_id: string
  content1?: string
  content2?: string
  act_status?: number
  media_info?: CardMediaInfo
  page_pic: string
  page_title: string
  page_url: string
  pic_info?: PicInfo
  oid: string
  type_icon: string
  author_id: string
  authorid: string
  warn?: string
  actionlog: CardActionlog
  page_desc?: string
  is_broadcast?: number
  icon_url?: string
  withPlayCount?: boolean
  ext?: string
}

export interface CardActionlog {
  act_type: number
  act_code: number | string
  lcardid: string
  fid: Fid
  mid?: string
  oid: string
  uuid: number
  source?: ObjectType
  ext: string
  cardid?: string
  uicode?: string
  luicode?: string
  lfid?: string
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
  play_completion_actions: PurplePlayCompletionAction[]
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
  storage_type: string
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
  actionlog: PurpleActionlog
  display_mode?: number
  display_starttime?: number
  display_endtime?: number
  countdown_time?: number
  scheme?: string
  ext?: EXT
  display_type?: number
}

export interface PurpleActionlog {
  oid: string
  act_code: number
  act_type: number
  source: ObjectType
  ext?: string
}

export interface EXT {
  uid: string
  user_name: string
  followers_count: number
  verified: boolean
  verified_type: number
  verified_type_ext: number
  verified_reason: string
  level: number
}

export interface VideoDownloadStrategy {
  abandon_download: number
}

export interface PicInfo {
  pic_big: PicInfoPicBig
  pic_small: PicInfoPicBig
  pic_middle: PicInfoPicBig
}

export interface PicInfoPicBig {
  height: string
  url: string
  width: string
}

export interface PageInfoMediaInfo {
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
  video_title?: string
  author_mid: string
  author_name: string
  is_playlist?: number
  get_playlist_id?: number
  extra_info: ExtraInfo
  video_download_strategy: VideoDownloadStrategy
  jump_to: number
  big_pic_info: BigPicInfo
  online_users: string
  online_users_number: number
  ttl: number
  storage_type: string
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
  profile_url: ProfileURL
  verified: boolean
  verified_type: number
  domain: Domain
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
}

type Domain = string
type ProfileURL = string
type CommentCnt = string
type LikeCnt = string
type RepostCnt = string
type TotalCnt = string
type TotalCntFormat = string

export interface StatusTotalCounter {
  total_cnt_format: TotalCntFormat
  comment_cnt: CommentCnt
  repost_cnt: RepostCnt
  like_cnt: LikeCnt
  total_cnt: TotalCnt
}

export interface FluffyPlayCompletionAction {
  type: number | string
  icon: string
  text: string
  link: string
  btn_code: number
  show_position: number
  actionlog: ActionlogElement
  display_mode?: number
  display_starttime?: number
  display_endtime?: number
  countdown_time?: number
  scheme?: string
  ext?: EXT
  display_type?: number
}

export interface ActionlogElement {
  oid: string
  act_code?: number
  act_type: number
  source: ObjectType
  mid?: string
  code?: string
  mark?: Mark
  ext?: string
  atype?: string
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

export enum QualityClass {
  HD = 'HD',
  SD = 'SD',
}

export enum QualityDesc {
  标清 = '标清',
  流畅 = '流畅',
  超清 = '超清',
  高清 = '高清',
}

export interface PlayInfo {
  type: number
  mime: MIME
  protocol: Protocol
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
  audio_codecs?: AudioCodecs
  audio_sample_rate?: number
  quality_label: string
  quality_class: QualityClass
  quality_desc: QualityDesc
  audio_channels?: number
  audio_sample_fmt?: AudioSampleFmt
  audio_bits_per_sample?: number
  watermark?: Watermark
  extension: Extension
  video_decoder: VideoDecoder
  prefetch_enabled: boolean
  tcp_receive_buffer: number
  dolby_atmos?: boolean
  col?: number
  row?: number
  interval?: number
  offset?: number
  urls?: string[]
  color_transfer?: ColorTransfer
  stereo_video?: number
  first_pkt_end_pos?: number
}

export enum AudioCodecs {
  Mp4A405 = 'mp4a.40.5',
}

export enum AudioSampleFmt {
  Fltp = 'fltp',
}

export enum ColorTransfer {
  Bt709 = 'bt709',
}

export interface Extension {
  transcode_info: TranscodeInfo
}

export interface TranscodeInfo {
  pcdn_rule_id: number
  pcdn_jank: number
  origin_video_dr: OriginVideoDR
  ab_strategies: string
}

export enum OriginVideoDR {
  SDR = 'SDR',
}

export enum MIME {
  ImageJPEG = 'image/jpeg',
  VideoMp4 = 'video/mp4',
}

export enum Protocol {
  General = 'general',
}

export enum VideoCodecs {
  Avc164001E = 'avc1.64001e',
  Avc164001F = 'avc1.64001f',
  Avc1640032 = 'avc1.640032',
  Avc1640033 = 'avc1.640033',
}

export enum VideoDecoder {
  Hard = 'hard',
}

export enum Watermark {
  None = 'none',
  Original = 'original',
}

export interface PicFocusPoint {
  focus_point: FocusPoint
  pic_id: string
}

export interface FocusPoint {
  left: number
  top: number
  width: number
  height: number
}

export interface PicInfos {
  [key: string]: The006_KicK4 | The006_KicK4Gy1Hv2Bs2Zse2J33412C1B2A
}

export interface The006_KicK4 {
  thumbnail: Bmiddle
  bmiddle: Bmiddle
  large: Bmiddle
  original: Bmiddle
  largest: Bmiddle
  mw2000: Bmiddle
  largecover: Bmiddle
  focus_point?: FocusPoint
  object_id: string
  pic_id: string
  photo_tag: number
  type: The006KicK4Gy1Hm75Sebprnj335S23U7WkType
  pic_status: number
  sticker_id?: string
  button_name?: string
  button_scheme?: string
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

export enum The006KicK4Gy1Hm75Sebprnj335S23U7WkType {
  Livephoto = 'livephoto',
  Pic = 'pic',
}

export interface The006_KicK4Gy1Hv2Bs2Zse2J33412C1B2A {
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
  type: The006KicK4Gy1Hm75Sebprnj335S23U7WkType
  pic_status: number
  video?: string
  fid?: string
  actionlog?: ActionlogElement[]
  focus_point?: FocusPoint
}

export enum Readtimetype {
  AdMblog = 'adMblog',
  Mblog = 'mblog',
}

export interface RetweetedStatus {
  visible: Visible
  created_at: string
  id: number
  idstr: string
  mid: string
  mblogid: string
  user: User
  can_edit: boolean
  textLength: number
  annotations?: Array<any[] | AnnotationClass>
  source: string
  favorited: boolean
  buttons: RetweetedStatusButton[]
  mark?: Mark
  rid: string
  cardid?: string
  pic_ids: string[]
  geo: string
  pic_num: number
  is_paid: boolean
  mblog_vip_type: number
  number_display_strategy?: NumberDisplayStrategy
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
  mblogtype: number
  showFeedRepost: boolean
  showFeedComment: boolean
  pictureViewerSign: boolean
  showPictureViewer: boolean
  rcList: any[]
  common_struct?: CommonStruct[]
  mixed_count: number
  is_show_mixed: boolean
  isSinglePayAudio: boolean
  text: string
  text_raw: string
  region_name?: string
  customIcons: any[]
  pic_infos?: { [key: string]: The006_KicK4Gy1Hv2Bs2Zse2J33412C1B2A }
  continue_tag?: ContinueTag
  content_auth_list?: ContentAuthList[]
  pic_focus_point?: PicFocusPoint[]
}

export interface RetweetedStatusButton {
  type: string
  name: string
  params: PurpleParams
  actionlog: FluffyActionlog
}

export interface FluffyActionlog {
  act_code: string
  oid: string
}

export interface PurpleParams {
  uid: number
  disable_group: number
  extparams: Extparams
}

export interface Extparams {
  followcardid: string
}

export interface CommonStruct {
  url: string
  name: string
  desc: string
  img: string
  type: number
  btn_show_type: string
  page_id: string
  actionlog: CommonStructActionlog
  buttons: CommonStructButton[]
  hidden: number
}

export interface CommonStructActionlog {
  act_code: string
  uid: string
  mid: number
  oid: string
  uicode: string
  cardid: string
  fid: Fid
  luicode: string
  lfid: string
  ext: string
  source: string
  act_type?: number
  code?: string
  mark?: Mark
}

export interface CommonStructButton {
  name: string
  pic: string
  type: string
  params: FluffyParams
  actionlog: TentacledActionlog
}

export interface TentacledActionlog {
  act_code: number | string
  uid: string
  mid: number
  oid: string
  uicode: string
  cardid: string
  fid: Fid
  luicode: string
  lfid: string
  ext: string
  source: string
  act_type?: number
  code?: string
  mark?: Mark
}

export interface FluffyParams {
  uid: string
  scheme: string
  type: string
  cleaned: boolean
}

export interface ContentAuthList {
  content_auth: number
  show_type: number
  rank: number
}

export interface ContinueTag {
  title: string
  pic: string
  scheme: string
  cleaned: boolean
}

export interface TitleSource {
  name: string
  url: string
  image: string
}

export interface User {
  id: number
  idstr: string
  pc_new: number
  screen_name: string
  profile_image_url: string
  profile_url: ProfileURL
  verified: boolean
  verified_type: number
  domain: Domain
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
  icon_list: IconList[]
}

export interface IconList {
  type: IconListType
  data: IconListData
}

export interface IconListData {
  mbrank: number
  mbtype: number
  svip: number
  vvip: number
}

export enum IconListType {
  Vip = 'vip',
}

export interface Visible {
  type: number
  list_id: number
}

export interface TagStruct {
  tag_name: string
  oid: string
  otype: string
  tag_scheme: string
  url_type_pic: string
  w_h_ratio: string
  actionlog: TagStructActionlog
}

export interface TagStructActionlog {
  act_code: number
  oid: string
  uicode: string
  luicode: string
  fid: Fid
  ext: string
}

export interface Title {
  text: string
  base_color: number
  icon_url: string
  structs: Struct[]
}

export interface Struct {
  scheme: string
  name: string
  cleaned: boolean
}

export interface TopicStruct {
  title: string
  topic_url: string
  topic_title: string
  actionlog: TopicStructActionlog
}

export interface TopicStructActionlog {
  act_type: number
  act_code: number
  oid: string
  uuid: number
  cardid: string
  lcardid: string
  uicode: string
  luicode: string
  fid: Fid
  lfid: string
  ext: string
}

export interface URLStruct {
  url_title: string
  url_type_pic: string
  ori_url: string
  page_id: string
  short_url: string
  long_url: string
  url_type: number | string
  result: boolean
  actionlog: URLStructActionlog
  storage_type: string
  hide: number
  object_type: string
  ttl?: number
  h5_target_url: string
  need_save_obj: number
}

export interface URLStructActionlog {
  act_type: number
  act_code: number
  oid: string
  uuid: number
  cardid: string
  lcardid: string
  uicode: string
  luicode: string
  fid: Fid
  lfid: string
  ext: string
  mid?: string
  source?: ObjectType
  code?: number | string
  mark?: Mark
  uid?: string
}
