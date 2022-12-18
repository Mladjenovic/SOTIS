using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class AddKnowledgeState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KnowledgeStates",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KnowledgeStates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KnowledgeStates_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KnowledgeStates_Users_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "KnowledgeStateProblems",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KnowledgeStateId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProblemId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KnowledgeStateProblems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KnowledgeStateProblems_KnowledgeStates_KnowledgeStateId",
                        column: x => x.KnowledgeStateId,
                        principalTable: "KnowledgeStates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KnowledgeStateProblems_Problems_ProblemId",
                        column: x => x.ProblemId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgeStateProblems_KnowledgeStateId",
                table: "KnowledgeStateProblems",
                column: "KnowledgeStateId");

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgeStateProblems_ProblemId",
                table: "KnowledgeStateProblems",
                column: "ProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgeStates_StudentId",
                table: "KnowledgeStates",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgeStates_SubjectId",
                table: "KnowledgeStates",
                column: "SubjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KnowledgeStateProblems");

            migrationBuilder.DropTable(
                name: "KnowledgeStates");
        }
    }
}
