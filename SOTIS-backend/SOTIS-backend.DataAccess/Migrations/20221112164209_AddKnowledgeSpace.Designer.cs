﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SOTIS_backend.DataAccess;

namespace SOTIS_backend.DataAccess.Migrations
{
    [DbContext(typeof(SotisDbContext))]
    [Migration("20221112164209_AddKnowledgeSpace")]
    partial class AddKnowledgeSpace
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.KnowledgeSpace", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("KnowledgeSpaces");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Problem", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("Problems");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.ProfessorAnswer", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<string>("QuestionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("ProfessorAnswers");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Question", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("PointsPerQuestion")
                        .HasColumnType("float");

                    b.Property<string>("SectionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Section", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TestId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TestId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Subject", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("MinimumPoints")
                        .HasColumnType("float");

                    b.Property<string>("ProfessorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ProfessorId");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.SubjectParticipant", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.HasIndex("UserId");

                    b.ToTable("SubjectParticipant");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Surmise", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DestinationProblemId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("KnowledgeSpaceId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SourceProblemId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("DestinationProblemId");

                    b.HasIndex("KnowledgeSpaceId");

                    b.HasIndex("SourceProblemId");

                    b.ToTable("Surmises");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Test", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("MinimumPoints")
                        .HasColumnType("float");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("SubjectId");

                    b.ToTable("Tests");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.TestResult", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<double>("Points")
                        .HasColumnType("float");

                    b.Property<string>("StudentId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("TestId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("TestId");

                    b.ToTable("TestResults");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.KnowledgeSpace", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Subject", "Subject")
                        .WithMany("KnowledgeSpaces")
                        .HasForeignKey("SubjectId");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Problem", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Subject", "Subject")
                        .WithMany("Problems")
                        .HasForeignKey("SubjectId");

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.ProfessorAnswer", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Question", "Question")
                        .WithMany("ProfessorAnswers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Question");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Question", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Section", "Section")
                        .WithMany("Questions")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Section");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Section", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Test", "Test")
                        .WithMany("Sections")
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Test");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Subject", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.User", "Professor")
                        .WithMany()
                        .HasForeignKey("ProfessorId");

                    b.Navigation("Professor");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.SubjectParticipant", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Subject", "Subject")
                        .WithMany("Students")
                        .HasForeignKey("SubjectId");

                    b.HasOne("SOTIS_backend.DataAccess.Models.User", "User")
                        .WithMany("SubjectParticipants")
                        .HasForeignKey("UserId");

                    b.Navigation("Subject");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Surmise", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Problem", "DestinationProblem")
                        .WithMany("DestinationSurmises")
                        .HasForeignKey("DestinationProblemId");

                    b.HasOne("SOTIS_backend.DataAccess.Models.KnowledgeSpace", "KnowledgeSpace")
                        .WithMany("Surmises")
                        .HasForeignKey("KnowledgeSpaceId");

                    b.HasOne("SOTIS_backend.DataAccess.Models.Problem", "SourceProblem")
                        .WithMany("SourceSurmises")
                        .HasForeignKey("SourceProblemId");

                    b.Navigation("DestinationProblem");

                    b.Navigation("KnowledgeSpace");

                    b.Navigation("SourceProblem");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Test", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.Subject", "Subject")
                        .WithMany("Tests")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Subject");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.TestResult", b =>
                {
                    b.HasOne("SOTIS_backend.DataAccess.Models.User", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId");

                    b.HasOne("SOTIS_backend.DataAccess.Models.Test", "Test")
                        .WithMany("TestResults")
                        .HasForeignKey("TestId");

                    b.Navigation("Student");

                    b.Navigation("Test");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.KnowledgeSpace", b =>
                {
                    b.Navigation("Surmises");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Problem", b =>
                {
                    b.Navigation("DestinationSurmises");

                    b.Navigation("SourceSurmises");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Question", b =>
                {
                    b.Navigation("ProfessorAnswers");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Section", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Subject", b =>
                {
                    b.Navigation("KnowledgeSpaces");

                    b.Navigation("Problems");

                    b.Navigation("Students");

                    b.Navigation("Tests");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.Test", b =>
                {
                    b.Navigation("Sections");

                    b.Navigation("TestResults");
                });

            modelBuilder.Entity("SOTIS_backend.DataAccess.Models.User", b =>
                {
                    b.Navigation("SubjectParticipants");
                });
#pragma warning restore 612, 618
        }
    }
}