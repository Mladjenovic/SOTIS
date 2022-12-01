using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class AddCorrectlyAnsweredQuestionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CorrectlyAnsweredQuestions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TestResultId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorrectlyAnsweredQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CorrectlyAnsweredQuestions_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CorrectlyAnsweredQuestions_TestResults_TestResultId",
                        column: x => x.TestResultId,
                        principalTable: "TestResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CorrectlyAnsweredQuestions_QuestionId",
                table: "CorrectlyAnsweredQuestions",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_CorrectlyAnsweredQuestions_TestResultId",
                table: "CorrectlyAnsweredQuestions",
                column: "TestResultId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CorrectlyAnsweredQuestions");
        }
    }
}
