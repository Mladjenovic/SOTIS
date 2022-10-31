using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class SubjectParticipantRepository : EntityBaseRepository<SubjectParticipant>, ISubjectParticipantRepository
    {
        public SubjectParticipantRepository(SotisDbContext context) : base(context) { }
    }
}
