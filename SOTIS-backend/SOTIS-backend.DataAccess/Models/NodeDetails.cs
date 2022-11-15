using SOTIS_backend.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("NodeDetails")]
    public class NodeDetails : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public int CoordinateX { get; set; }

        public int CoordinateY { get; set; }

        public string ProblemId { get; set; }

        public Problem Problem { get; set; }

        public string KnowledgeSpaceId { get; set; }

        public KnowledgeSpace KnowledgeSpace { get; set; }
    }
}
