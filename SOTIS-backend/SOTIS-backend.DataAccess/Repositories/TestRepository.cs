using Microsoft.EntityFrameworkCore;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using System.Linq;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class TestRepository : EntityBaseRepository<Test>, ITestRepository
    {
        public TestRepository(SotisDbContext context) : base(context) { }

        public Test GetSingleThenInclude(string testId)
        {
            return Context.Set<Test>()
                    .Include(x => x.TestResults)
                    .Include(x => x.Sections)
                    .ThenInclude(x => x.Questions)
                    .ThenInclude(x => x.ProfessorAnswers)
                    .FirstOrDefault(x => x.Id == testId);
        }
    }
}
