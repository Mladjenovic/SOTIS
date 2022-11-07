using System;

namespace SOTIS_backend.Controllers.Dtos
{
    public class TestResultResponseDto
    {
        public string StudentUsername { get; set; }

        public string StudentName { get; set; }

        public string StudentSurname { get; set; }

        public DateTime DateTime { get; set; }

        public double Points { get; set; }
    }
}
