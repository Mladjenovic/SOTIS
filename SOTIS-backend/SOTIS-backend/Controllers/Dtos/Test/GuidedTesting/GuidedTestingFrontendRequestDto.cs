using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos.Test.GuidedTesting
{
    public class GuidedTestingFrontendRequestDto : GuidedTestingBaseDto
    {
        public QuestionDto Question { get; set; }

        public IEnumerable<string> StudentAnswerIds { get; set; }
    }
}
