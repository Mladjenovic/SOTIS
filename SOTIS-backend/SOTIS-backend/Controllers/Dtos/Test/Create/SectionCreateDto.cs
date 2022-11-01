using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class SectionCreateDto : SectionBaseDto
    {
        public IEnumerable<QuestionCreateDto> Questions { get; set; }
    }
}