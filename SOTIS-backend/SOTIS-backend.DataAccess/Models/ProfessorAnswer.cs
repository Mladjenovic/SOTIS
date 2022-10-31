using SOTIS_backend.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("ProfessorAnswers")]
    public class ProfessorAnswer : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Text { get; set; }

        public bool IsCorrect { get; set; }

        public Question Question { get; set; }

        public string QuestionId { get; set; }
    }
}
