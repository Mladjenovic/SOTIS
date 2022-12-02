using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class UpdateForeignKeyConstraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_Questions_QuestionId",
                table: "CorrectlyAnsweredQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_TestResults_TestResultId",
                table: "CorrectlyAnsweredQuestions");

            migrationBuilder.AddForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_Questions_QuestionId",
                table: "CorrectlyAnsweredQuestions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_TestResults_TestResultId",
                table: "CorrectlyAnsweredQuestions",
                column: "TestResultId",
                principalTable: "TestResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_Questions_QuestionId",
                table: "CorrectlyAnsweredQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_TestResults_TestResultId",
                table: "CorrectlyAnsweredQuestions");

            migrationBuilder.AddForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_Questions_QuestionId",
                table: "CorrectlyAnsweredQuestions",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CorrectlyAnsweredQuestions_TestResults_TestResultId",
                table: "CorrectlyAnsweredQuestions",
                column: "TestResultId",
                principalTable: "TestResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
