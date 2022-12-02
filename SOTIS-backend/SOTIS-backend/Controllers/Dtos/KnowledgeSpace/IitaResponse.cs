using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class IitaResponse
    {
        [JsonProperty("diff")]
        public IEnumerable<double> Diff { get; set; }

        [JsonProperty("implications")]
        public IEnumerable<IEnumerable<int>> Implications { get; set; }
    }
}
