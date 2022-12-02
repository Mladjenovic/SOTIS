using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SOTIS_backend.Common.Utilities
{
    public static class HttpHelper
    {
        public static async Task<T> PostAsync<T>(string url, object obj)
        {
            using (var httpClient = new HttpClient())
            {
                var result = await httpClient.PostAsync(url,
                    new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json"));
                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(content);
            }
        }
    }
}
