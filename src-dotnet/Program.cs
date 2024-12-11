using Flurl;
using Flurl.Http;

namespace Weibo;

class MainClass
{
  public static async Task Main()
  {
    var result = await Pptr.Luanch();
    Console.WriteLine(result);

    var x = await "https://weibo.com/ajax/profile/info"
      .SetQueryParams(new { uid = "5796662600" })
      .WithHeader("cookie", result.WeiboCookie)
      .GetJsonAsync<dynamic>();
    Console.WriteLine(x);
    // Console.WriteLine(x.data.user.screen_name);
  }
}
