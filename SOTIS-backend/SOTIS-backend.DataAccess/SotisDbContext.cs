using Microsoft.EntityFrameworkCore;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.DataAccess
{
    public class SotisDbContext : DbContext
    {
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

            modelBuilder.Entity<CorrectlyAnsweredQuestion>()
                .HasOne(caq => caq.TestResult)
                .WithMany(tr => tr.CorrectlyAnsweredQuestions)
                .HasForeignKey(caq => caq.TestResultId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CorrectlyAnsweredQuestion>()
                .HasOne(caq => caq.Question)
                .WithMany(q => q.CorrectlyAnsweredQuestions)
                .HasForeignKey(caq => caq.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<Surmise>()
                    .HasOne(m => m.SourceProblem)
                    .WithMany(t => t.SourceSurmises)
                    .HasForeignKey(m => m.SourceProblemId);

            modelBuilder.Entity<Surmise>()
                        .HasOne(m => m.DestinationProblem)
                        .WithMany(t => t.DestinationSurmises)
                        .HasForeignKey(m => m.DestinationProblemId);

            modelBuilder.Entity<KnowledgeSpace>()
                .HasMany(p => p.Surmises)
                .WithOne(b => b.KnowledgeSpace)
                .HasForeignKey(p => p.KnowledgeSpaceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<KnowledgeSpace>()
                .HasMany(p => p.NodeDetails)
                .WithOne(b => b.KnowledgeSpace)
                .HasForeignKey(p => p.KnowledgeSpaceId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
