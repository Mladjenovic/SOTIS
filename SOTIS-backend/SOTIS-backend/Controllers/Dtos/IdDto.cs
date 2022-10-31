using SOTIS_backend.DataAccess.Interfaces;

namespace SOTIS_backend.Controllers.Dtos
{
    public class IdDto : IEntityBase
    {
        public string Id { get; set; }
    }
}
