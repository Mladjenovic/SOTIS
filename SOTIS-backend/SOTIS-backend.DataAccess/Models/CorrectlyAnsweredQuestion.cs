using SOTIS_backend.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("CorrectlyAnsweredQuestions")]
    public class CorrectlyAnsweredQuestion : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string QuestionId { get; set; }

        public Question Question { get; set; }

        public string TestResultId { get; set; }

        public TestResult TestResult { get; set; }
    }
}
