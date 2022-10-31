using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class ProfessorAnswerRepository : EntityBaseRepository<ProfessorAnswer>, IProfessorAnswerRepository
    {
        public ProfessorAnswerRepository(SotisDbContext context) : base(context) { }
    }
}
