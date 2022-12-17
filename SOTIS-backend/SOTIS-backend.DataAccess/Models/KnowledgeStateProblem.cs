using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("KnowledgeStateProblems")]
    public class KnowledgeStateProblem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string KnowledgeStateId { get; set; }

        public KnowledgeState KnowledgeState { get; set; }

        public string ProblemId { get; set; }

        public Problem Problem { get; set; }
    }
}