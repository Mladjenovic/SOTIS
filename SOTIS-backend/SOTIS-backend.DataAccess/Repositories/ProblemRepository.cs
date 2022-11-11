using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class ProblemRepository : EntityBaseRepository<Problem>, IProblemRepository
    {
        public ProblemRepository(SotisDbContext context) : base(context) { }
    }
}
