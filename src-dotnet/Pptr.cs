using System;
using PuppeteerSharp;

namespace Weibo;

record LaunchResult
{
  public required string WeiboCookie { get; set; }
}

class Pptr
{
  static readonly string baseDataDir = Environment.GetFolderPath(
    Environment.SpecialFolder.ApplicationData
  );
  static readonly string dataDir = Path.Combine(baseDataDir, "@magicdawn/weibo");
  static readonly string pptrDataDir = Path.Combine(dataDir, "pptr-data");

  public static async Task<LaunchResult> Luanch()
  {
    Console.WriteLine("dataDir: {0}, pptrDataDir: {1}", dataDir, pptrDataDir);
    using var browser = await new Launcher().LaunchAsync(
      new LaunchOptions
      {
        Browser = SupportedBrowser.Chrome,
        ExecutablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        UserDataDir = pptrDataDir,
        Headless = false,
        DefaultViewport = null,
      }
    );

    var page = await browser.NewPageAsync();
    await page.GoToAsync("https://weibo.com");

    async Task<bool> logined()
    {
      return await page.EvaluateFunctionAsync<bool>(
        @"() => {
          const loginButton = Array.from(
              document.querySelectorAll('.woo-box-flex > a[class*=LoginBtn_btn_]'),
          ).filter((x) => x.innerText.trim() === '登录')[0]
          return !loginButton
        }"
      );
    }

    if (!await logined())
    {
      Console.WriteLine("plz login first");
      Thread.Sleep(1_0000_0000);
    }

    var WeiboCookie = string.Join(
      ";",
      (await page.GetCookiesAsync())
        .Where((x) => x.Domain == "weibo.com" || x.Domain.EndsWith(".weibo.com"))
        .Select(x => $"{x.Name}={x.Value}")
    );

    return new LaunchResult { WeiboCookie = WeiboCookie };
  }
}
