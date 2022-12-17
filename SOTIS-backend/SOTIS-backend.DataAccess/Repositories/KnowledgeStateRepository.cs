using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class KnowledgeStateRepository : EntityBaseRepository<KnowledgeState>, IKnowledgeStateRepository
    {
        public KnowledgeStateRepository(SotisDbContext context) : base(context) { }
    }
}
