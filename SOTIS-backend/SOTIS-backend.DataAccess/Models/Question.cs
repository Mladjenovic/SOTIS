using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("Questions")]
    public class Question : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Text { get; set; }

        public IEnumerable<ProfessorAnswer> PossibleAnswers { get; set; }

        public double PointsPerQuestion { get; set; }

        public Section Section { get; set; }

        public string SectionId { get; set; }
    }
}
