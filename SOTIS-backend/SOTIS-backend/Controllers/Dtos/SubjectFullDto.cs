using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class SubjectFullDto : SubjectDto
    {
        public UserDto Professor { get; set; }

        public IEnumerable<UserDto> Students { get; set; }
    }
}
