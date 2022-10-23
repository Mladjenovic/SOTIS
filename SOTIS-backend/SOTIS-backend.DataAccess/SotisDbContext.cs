using Microsoft.EntityFrameworkCore;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess
{
    public class SotisDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public SotisDbContext(DbContextOptions<SotisDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60);
        }
    }
}
