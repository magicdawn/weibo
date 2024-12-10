import createDebug from 'debug'
import envPaths from 'env-paths'

export const baseDebug = createDebug('weibo')

export const appPaths = envPaths('@magicdawn/weibo', { suffix: '' })
