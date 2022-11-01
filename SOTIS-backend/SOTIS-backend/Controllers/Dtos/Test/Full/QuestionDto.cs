using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class QuestionDto : QuestionBaseDto
    {
        public string Id { get; set; }

        public string SectionId { get; set; }

        public IEnumerable<ProfessorAnswerDto> ProfessorAnswers { get; set; }
    }
}
