import path from 'path'
import { launch, type Browser } from 'puppeteer-core'
import type {} from 'typed-query-selector'
import { appPaths } from './common'

export let WEIBO_COOKIE = ''
export let CLIENT_VERSION = ''
export let SERVER_VERSION = ''

export let browser: Browser

export async function startPptr() {
  browser = await launch({
    browser: 'chrome',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    userDataDir: path.join(appPaths.data, 'pptr-data'),
    headless: false,
    defaultViewport: null,
  })
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
