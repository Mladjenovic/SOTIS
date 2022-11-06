using SOTIS_backend.DataAccess.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOTIS_backend.DataAccess.Models
{
    [Table("TestResults")]
    public class TestResult : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string TestId { get; set; }

        public Test Test { get; set; }

        public string StudentId { get; set; }

        public User Student { get; set; }

        public DateTime DateTime { get; set; }

        public double Points { get; set; }
    }
}
