using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class AddProblemToQuestion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProblemId",
                table: "Questions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ProblemId",
                table: "Questions",
                column: "ProblemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Problems_ProblemId",
                table: "Questions",
                column: "ProblemId",
                principalTable: "Problems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Problems_ProblemId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ProblemId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ProblemId",
                table: "Questions");
        }
    }
}
