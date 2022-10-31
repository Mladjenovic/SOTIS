using Microsoft.EntityFrameworkCore;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess
{
    public class SotisDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<ProfessorAnswer> ProfessorAnswers { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<Section> Sections { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<Test> Tests { get; set; }

        public DbSet<SubjectParticipant> SubjectParticipants { get; set; }

        public SotisDbContext(DbContextOptions<SotisDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(user => user.Username)
                .HasMaxLength(60);

            modelBuilder.Entity<SubjectParticipant>()
                .HasOne(u => u.User)
                .WithMany(s => s.SubjectParticipants)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<SubjectParticipant>()
                .HasOne(sc => sc.Subject)
                .WithMany(s => s.Students)
                .HasForeignKey(sc => sc.SubjectId);
        }
    }
}
