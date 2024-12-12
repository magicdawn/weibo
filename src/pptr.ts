import path from 'path'
import { launch, type Browser, type LaunchOptions } from 'puppeteer-core'
import type {} from 'typed-query-selector'
import { appPaths, baseDebug } from './common'
import {
  ChromeReleaseChannel,
  computeSystemExecutablePath,
  Browser as SystemBrowser,
} from '@puppeteer/browsers'

const debug = baseDebug.extend('pptr')

export let WEIBO_COOKIE = ''
export let CLIENT_VERSION = ''
export let SERVER_VERSION = ''

export let browser: Browser

export async function startPptr(moreOptions: Partial<LaunchOptions> = {}) {
  let executablePath: string
  if (process.env.PPTR_EXECUTABLE_PATH) {
    executablePath = process.env.PPTR_EXECUTABLE_PATH
  } else {
    executablePath = computeSystemExecutablePath({
      browser: SystemBrowser.CHROME,
      channel: ChromeReleaseChannel.STABLE,
    })
  }
  const userDataDir = path.join(appPaths.data, 'pptr-data')

  const launchOptions: LaunchOptions = {
    browser: 'chrome',
    executablePath,
    userDataDir,
    defaultViewport: null,
    ...moreOptions,
  }
  debug('launchOptions: %O', launchOptions)
  browser = await launch(launchOptions)

  const page = await browser.newPage()
  await page.goto('https://weibo.com', {
    waitUntil: 'load',
  })

  async function logined() {
    return page.evaluate(() => {
      const loginButton = Array.from(
        document.querySelectorAll('.woo-box-flex > a[class*=LoginBtn_btn_]'),
      ).filter((x) => x.innerText.trim() === '登录')[0]
      return !loginButton
    })
  }

  if (!(await logined())) {
    console.log('click login button')
    await page.evaluate(() => {
      document.querySelector('.woo-box-flex > a[class*=LoginBtn_btn_]')?.click()
    })
    return
  }

  // set versions
  const versions = await page.evaluate(() => {
    return (window as any).$VERSION as { CLIENT: string; SERVER: string }
  })
  CLIENT_VERSION = versions.CLIENT
  SERVER_VERSION = versions.SERVER

  if (await logined()) {
    const cookies = (await browser.cookies())
      .filter((x) => x.domain === 'weibo.com' || x.domain.endsWith('.weibo.com'))
      .map((x) => `${x.name}=${x.value}`)
      .join(';')
    WEIBO_COOKIE = cookies
  }
}
