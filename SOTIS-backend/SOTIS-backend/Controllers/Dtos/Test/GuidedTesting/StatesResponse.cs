using Newtonsoft.Json;
using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos.Test.GuidedTesting
{
    public class StatesResponse
    {
        [JsonProperty("states")]
        public IEnumerable<IEnumerable<int>> States { get; set; }
    }
}
