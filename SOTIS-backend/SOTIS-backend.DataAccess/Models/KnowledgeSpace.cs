using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("KnowledgeSpaces")]
    public class KnowledgeSpace : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string SubjectId { get; set; }

        public Subject Subject { get; set; }

        public IEnumerable<Surmise> Surmises { get; set; }
    }
}
