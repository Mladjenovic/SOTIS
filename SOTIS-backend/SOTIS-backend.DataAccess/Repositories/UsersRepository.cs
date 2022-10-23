using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using SOTIS_backend.DataAccess.Repositories;

namespace SOTIS_backend.DataAccess
{
    public class UsersRepository : EntityBaseRepository<User>, IUsersRepository
    {
        public UsersRepository(SotisDbContext context) : base(context) { }
    }
}
