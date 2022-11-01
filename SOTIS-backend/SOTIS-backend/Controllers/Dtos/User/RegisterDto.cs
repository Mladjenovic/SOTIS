using SOTIS_backend.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace SOTIS_backend.Controllers.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
