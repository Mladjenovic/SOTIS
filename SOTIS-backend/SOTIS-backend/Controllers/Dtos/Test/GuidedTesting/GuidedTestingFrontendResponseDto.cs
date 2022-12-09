namespace SOTIS_backend.Controllers.Dtos.Test.GuidedTesting
{
    public class GuidedTestingFrontendResponseDto : GuidedTestingBaseDto
    {
        public QuestionDto Question { get; set; }

        public bool IsFinalStateReached { get; set; }
    }
}
