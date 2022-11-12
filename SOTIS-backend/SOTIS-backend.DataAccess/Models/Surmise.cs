using SOTIS_backend.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("Surmises")]
    public class Surmise : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string KnowledgeSpaceId { get; set; }

        public KnowledgeSpace KnowledgeSpace { get; set; }

        public string SourceProblemId { get; set; }

        public Problem SourceProblem { get; set; }

        public string DestinationProblemId { get; set; }

        public Problem DestinationProblem { get; set; }
    }
}
