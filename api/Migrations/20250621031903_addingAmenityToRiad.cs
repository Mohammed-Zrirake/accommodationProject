using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class addingAmenityToRiad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RiadId",
                table: "Amenities",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Amenities_RiadId",
                table: "Amenities",
                column: "RiadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Amenities_Riads_RiadId",
                table: "Amenities",
                column: "RiadId",
                principalTable: "Riads",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Amenities_Riads_RiadId",
                table: "Amenities");

            migrationBuilder.DropIndex(
                name: "IX_Amenities_RiadId",
                table: "Amenities");

            migrationBuilder.DropColumn(
                name: "RiadId",
                table: "Amenities");
        }
    }
}
