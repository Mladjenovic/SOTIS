namespace SOTIS_backend.Controllers.Dtos
{
    public class TestBaseDto
    {
        public string Id { get; set; }

        public string SubjectId { get; set; }
        
        public string Title { get; set; }

        public string Description { get; set; }

        public double MinimumPoints { get; set; }
    }
}
