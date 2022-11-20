using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("Problems")]
    public class Problem : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string SubjectId { get; set; }

        public Subject Subject { get; set; }

        public IEnumerable<Surmise> SourceSurmises { get; set; }

        public IEnumerable<Surmise> DestinationSurmises { get; set; }

        public IEnumerable<Question> Questions { get; set; }
    }
}
