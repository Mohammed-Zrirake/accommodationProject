using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<Accommodation> Accommodations { get; set; } = null!;
        public DbSet<Hotel> Hotels { get; set; } = null!;
        public DbSet<Appartement> Appartements { get; set; } = null!;
        public DbSet<Villa> Villas { get; set; } = null!;
        public DbSet<Cottage> Cottages { get; set; } = null!;
        public DbSet<Hostel> Hostels { get; set; } = null!;
        public DbSet<Riad> Riads { get; set; } = null!;
        public DbSet<Room> Rooms { get; set; } = null!;
        public DbSet<Dorm> Dorms { get; set; } = null!;
        public DbSet<Amenity> Amenities { get; set; } = null!;

        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Wishlist> Wishlists { get; set; } = null!;
        public DbSet<WishlistItem> WishlistItems { get; set; } = null!;
        public DbSet<Card> Cards { get; set; } = null!;
        public DbSet<Payment> Payments { get; set; } = null!;
        public DbSet<Review> Reviews { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Like> Likes { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Configures ASP.NET Core Identity tables

            // Wishlist <-> Accommodation / Room / Dorm (Polymorphic via WishlistItem)
            modelBuilder.Entity<WishlistItem>(entity =>
            {
                entity.HasKey(wi => wi.WishlistItemId);

                entity.HasOne(wi => wi.Wishlist)
                    .WithMany(w => w.WishlistItems)
                    .HasForeignKey(wi => wi.WishlistId)
                    .IsRequired();

                entity.HasOne(wi => wi.Accommodation)
                    .WithMany(a => a.WishlistItems)
                    .HasForeignKey(wi => wi.AccommodationId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(wi => wi.Room)
                    .WithMany(r => r.WishlistItems)
                    .HasForeignKey(wi => wi.RoomId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(wi => wi.Dorm)
                    .WithMany(d => d.WishlistItems)
                    .HasForeignKey(wi => wi.DormId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.ToTable(t => t.HasCheckConstraint("CK_WishlistItem_ExclusiveArc",
                    @"(
                        (CASE WHEN AccommodationId IS NOT NULL THEN 1 ELSE 0 END) +
                        (CASE WHEN RoomId IS NOT NULL THEN 1 ELSE 0 END) +
                        (CASE WHEN DormId IS NOT NULL THEN 1 ELSE 0 END)
                    ) = 1"));
            });

            // User <-> Wishlist (One-to-One)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Wishlist)
                .WithOne(w => w.User)
                .HasForeignKey<Wishlist>(w => w.UserId);

            // Accommodation -> Address (Owned Entity Type)
            modelBuilder.Entity<Accommodation>().OwnsOne(a => a.Address);
            modelBuilder.Entity<Hotel>().OwnsOne(h => h.Address);
            modelBuilder.Entity<Hostel>().OwnsOne(h => h.Address);
            modelBuilder.Entity<Riad>().OwnsOne(riad => riad.Address);

            // Booking polymorphic relationships
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Accommodation)
                .WithMany(a => a.Bookings)
                .HasForeignKey(b => b.AccommodationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany(r => r.Bookings)
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Dorm)
                .WithMany(d => d.Bookings)
                .HasForeignKey(b => b.DormId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Booking>()
                .ToTable(t => t.HasCheckConstraint("CK_Booking_ExclusiveArc",
                    @"(
                        (CASE WHEN AccommodationId IS NOT NULL THEN 1 ELSE 0 END) +
                        (CASE WHEN RoomId IS NOT NULL THEN 1 ELSE 0 END) +
                        (CASE WHEN DormId IS NOT NULL THEN 1 ELSE 0 END)
                    ) = 1"));

            // Booking <-> Review (One-to-0..1)
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Review)
                .WithOne(r => r.Booking)
                .HasForeignKey<Review>(r => r.BookingId);

            // Hotel -> Rooms (One-to-Many)
            modelBuilder.Entity<Hotel>()
                .HasMany(h => h.Rooms)
                .WithOne(r => r.Hotel)
                .HasForeignKey(r => r.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

            // Hostel -> Dorms (One-to-Many)
            modelBuilder.Entity<Hostel>()
                .HasMany(h => h.Dorms)
                .WithOne(d => d.Hostel)
                .HasForeignKey(d => d.HostelId)
                .OnDelete(DeleteBehavior.Cascade);

            // Hostel -> PrivateRooms (One-to-Many)
            modelBuilder.Entity<Hostel>()
                .HasMany(hostel => hostel.PrivateRooms)
                .WithOne(room => room.Hostel)
                .HasForeignKey(room => room.HostelId)
                .OnDelete(DeleteBehavior.Cascade);

            // Riad -> Rooms (One-to-Many)
            modelBuilder.Entity<Riad>()
                .HasMany(riad => riad.Rooms)
                .WithOne(room => room.Riad)
                .HasForeignKey(room => room.RiadId)
                .OnDelete(DeleteBehavior.Cascade);

            // Booking <-> Payment (One-to-One)
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment)
                .WithOne(p => p.Booking)
                .HasForeignKey<Payment>(b => b.BookingId);

            // Like (Unique constraint per user per accommodation)
            modelBuilder.Entity<Like>()
                .HasKey(l => l.LikeId);
            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.UserId, l.AccommodationId }).IsUnique();
            modelBuilder.Entity<Like>()
                .HasOne(l => l.Accommodation)
                .WithMany(a => a.Likes)
                .HasForeignKey(l => l.AccommodationId);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Accommodation)
                .WithMany(a => a.Comments)
                .HasForeignKey(c => c.AccommodationId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.ManagedAccommodations)
                .WithOne(a => a.Provider)
                .HasForeignKey(a => a.ProviderId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}