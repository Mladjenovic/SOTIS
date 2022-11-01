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

            modelBuilder.Entity<Subject>()
                .HasMany(p => p.Tests)
                .WithOne(b => b.Subject)
                .HasForeignKey(p => p.SubjectId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Test>()
                .HasMany(p => p.Sections)
                .WithOne(b => b.Test)
                .HasForeignKey(p => p.TestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Section>()
                .HasMany(p => p.Questions)
                .WithOne(b => b.Section)
                .HasForeignKey(p => p.SectionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Question>()
                .HasMany(p => p.ProfessorAnswers)
                .WithOne(b => b.Question)
                .HasForeignKey(p => p.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
