using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class SubjectRepository : EntityBaseRepository<Subject>, ISubjectRepository
    {
        public SubjectRepository(SotisDbContext context) : base(context) { }
    }
}
