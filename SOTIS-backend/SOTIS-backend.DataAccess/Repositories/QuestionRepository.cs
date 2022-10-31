using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class QuestionRepository : EntityBaseRepository<Question>, IQuestionRepository
    {
        public QuestionRepository(SotisDbContext context) : base(context) { }
    }
}
