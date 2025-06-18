using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class HostelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProviderId",
                table: "Hostels",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "HostelId",
                table: "Amenities",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hostels_ProviderId",
                table: "Hostels",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Amenities_HostelId",
                table: "Amenities",
                column: "HostelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Amenities_Hostels_HostelId",
                table: "Amenities",
                column: "HostelId",
                principalTable: "Hostels",
                principalColumn: "HostelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hostels_Users_ProviderId",
                table: "Hostels",
                column: "ProviderId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Amenities_Hostels_HostelId",
                table: "Amenities");

            migrationBuilder.DropForeignKey(
                name: "FK_Hostels_Users_ProviderId",
                table: "Hostels");

            migrationBuilder.DropIndex(
                name: "IX_Hostels_ProviderId",
                table: "Hostels");

            migrationBuilder.DropIndex(
                name: "IX_Amenities_HostelId",
                table: "Amenities");

            migrationBuilder.DropColumn(
                name: "ProviderId",
                table: "Hostels");

            migrationBuilder.DropColumn(
                name: "HostelId",
                table: "Amenities");
        }
    }
}
