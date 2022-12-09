namespace SOTIS_backend.Controllers.Dtos.Test.GuidedTesting
{
    public class GuidedTestingPythonRequestDto : GuidedTestingBaseDto
    {
        public string ProblemId { get; set; }

        public bool IsAnswerCorrect { get; set; }

        public double Threshold { get; set; }
    }
}
