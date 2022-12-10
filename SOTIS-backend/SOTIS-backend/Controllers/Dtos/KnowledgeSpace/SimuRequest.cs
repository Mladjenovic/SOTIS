using Newtonsoft.Json;
using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos.KnowledgeSpace
{
    public class SimuRequest
    {
        [JsonProperty("number_of_problems")]
        public int NumberOfProblems { get; set; }

        [JsonProperty("number_of_test_results")]
        public int NumberOfTestResults { get; set; }

        [JsonProperty("ce_probability")]
        public double CEprobability { get; set; }

        [JsonProperty("lg_probability")]
        public double LGprobability { get; set; }

        [JsonProperty("delta")]
        public double Delta { get; set; }

        [JsonProperty("implications")]
        public IEnumerable<IEnumerable<int>> Implications { get; set; }
    }
}
