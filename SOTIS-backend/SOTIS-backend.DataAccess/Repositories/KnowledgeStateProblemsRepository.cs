using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class KnowledgeStateProblemsRepository : EntityBaseRepository<KnowledgeStateProblem>, IKnowledgeStateProblemsRepository
    {
        public KnowledgeStateProblemsRepository(SotisDbContext context) : base(context) { }
    }
}
