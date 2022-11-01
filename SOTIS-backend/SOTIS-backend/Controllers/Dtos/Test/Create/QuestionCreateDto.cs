using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class QuestionCreateDto : QuestionBaseDto
    {
        public IEnumerable<ProfessorAnswerBaseDto> ProfessorAnswers { get; set; }
    }
}