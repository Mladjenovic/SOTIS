using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class KnowledgeSpaceCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NodeDetails_KnowledgeSpaces_KnowledgeSpaceId",
                table: "NodeDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Surmises_KnowledgeSpaces_KnowledgeSpaceId",
                table: "Surmises");

            migrationBuilder.AddForeignKey(
                name: "FK_NodeDetails_KnowledgeSpaces_KnowledgeSpaceId",
                table: "NodeDetails",
                column: "KnowledgeSpaceId",
                principalTable: "KnowledgeSpaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Surmises_KnowledgeSpaces_KnowledgeSpaceId",
                table: "Surmises",
                column: "KnowledgeSpaceId",
                principalTable: "KnowledgeSpaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NodeDetails_KnowledgeSpaces_KnowledgeSpaceId",
                table: "NodeDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Surmises_KnowledgeSpaces_KnowledgeSpaceId",
                table: "Surmises");

            migrationBuilder.AddForeignKey(
                name: "FK_NodeDetails_KnowledgeSpaces_KnowledgeSpaceId",
                table: "NodeDetails",
                column: "KnowledgeSpaceId",
                principalTable: "KnowledgeSpaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Surmises_KnowledgeSpaces_KnowledgeSpaceId",
                table: "Surmises",
                column: "KnowledgeSpaceId",
                principalTable: "KnowledgeSpaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
