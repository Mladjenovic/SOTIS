using SOTIS_backend.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("KnowledgeStates")]
    public class KnowledgeState : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string SubjectId { get; set; }

        public Subject Subject { get; set; }

        public string StudentId { get; set; }

        public User Student { get; set; }

        public IEnumerable<KnowledgeStateProblem> KnowledgeStateProblems { get; set; }
    }
}
