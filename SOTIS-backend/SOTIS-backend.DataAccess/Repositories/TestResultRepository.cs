using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class TestResultRepository : EntityBaseRepository<TestResult>, ITestResultRepository
    {
        public TestResultRepository(SotisDbContext context) : base(context) { }
    }
}
