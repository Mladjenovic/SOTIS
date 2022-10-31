using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class SectionRepository : EntityBaseRepository<Section>, ISectionRepository
    {
        public SectionRepository(SotisDbContext context) : base(context) { }
    }
}
