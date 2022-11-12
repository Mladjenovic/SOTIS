using Microsoft.EntityFrameworkCore.Migrations;

namespace SOTIS_backend.DataAccess.Migrations
{
    public partial class AddKnowledgeSpace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KnowledgeSpaces",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SubjectId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KnowledgeSpaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KnowledgeSpaces_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Surmises",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    KnowledgeSpaceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SourceProblemId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DestinationProblemId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surmises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Surmises_KnowledgeSpaces_KnowledgeSpaceId",
                        column: x => x.KnowledgeSpaceId,
                        principalTable: "KnowledgeSpaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surmises_Problems_DestinationProblemId",
                        column: x => x.DestinationProblemId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Surmises_Problems_SourceProblemId",
                        column: x => x.SourceProblemId,
                        principalTable: "Problems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_KnowledgeSpaces_SubjectId",
                table: "KnowledgeSpaces",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Surmises_DestinationProblemId",
                table: "Surmises",
                column: "DestinationProblemId");

            migrationBuilder.CreateIndex(
                name: "IX_Surmises_KnowledgeSpaceId",
                table: "Surmises",
                column: "KnowledgeSpaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Surmises_SourceProblemId",
                table: "Surmises",
                column: "SourceProblemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Surmises");

            migrationBuilder.DropTable(
                name: "KnowledgeSpaces");
        }
    }
}
