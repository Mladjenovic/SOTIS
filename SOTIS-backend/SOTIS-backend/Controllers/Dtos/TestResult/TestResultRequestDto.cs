using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class TestResultRequestDto
    {
        public string TestId { get; set; }

        public IEnumerable<IdDto> SelectedStudentAnswers { get; set; }
    }
}
