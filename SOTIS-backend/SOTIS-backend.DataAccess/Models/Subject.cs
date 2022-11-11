using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("Subjects")]
    public class Subject : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public double MinimumPoints { get; set; }

        public IEnumerable<Test> Tests { get; set; }

        public User Professor { get; set; }

        public IEnumerable<SubjectParticipant> Students { get; set; }

        public IEnumerable<Problem> Problems { get; set; }
    }
}
