using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class TestRepository : EntityBaseRepository<Test>, ITestRepository
    {
        public TestRepository(SotisDbContext context) : base(context) { }
    }
}
