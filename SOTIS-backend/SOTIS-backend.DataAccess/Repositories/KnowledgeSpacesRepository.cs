using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    class KnowledgeSpacesRepository : EntityBaseRepository<KnowledgeSpace>, IKnowledgeSpacesRepository
    {
        public KnowledgeSpacesRepository(SotisDbContext context) : base(context) { }
    }
}
