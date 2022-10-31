using SOTIS_backend.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("SubjectParticipant")]
    public class SubjectParticipant : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string SubjectId { get; set; }

        public Subject Subject { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
