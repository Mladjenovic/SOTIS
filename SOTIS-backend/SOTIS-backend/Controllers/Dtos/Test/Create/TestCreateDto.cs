using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class TestCreateDto : TestBaseDto
    {
        public IEnumerable<SectionCreateDto> Sections { get; set; }
    }
}
