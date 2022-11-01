using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class SectionDto : SectionBaseDto
    {
        public string Id { get; set; }

        public string TestId { get; set; }

        public IEnumerable<QuestionDto> Questions { get; set; }
    }
}
