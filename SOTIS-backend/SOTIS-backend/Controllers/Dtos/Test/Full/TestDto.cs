using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class TestDto : TestBaseDto
    {
        public IEnumerable<SectionDto> Sections { get; set; }
    }
}
