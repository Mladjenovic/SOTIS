using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("Tests")]
    public class Test : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double MinimumPoints { get; set; }

        public Subject Subject { get; set; }

        public string SubjectId { get; set; }

        public IEnumerable<Section> Sections { get; set; }

        public IEnumerable<TestResult> TestResults { get; set; }
    }
}
