using SOTIS_backend.Common.Enums;

namespace SOTIS_backend.Common.Models
{
    public class SessionInfo
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public Role Role { get; set; }
    }
}
