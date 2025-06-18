using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        // --- DbSets pour chaque entité principale qui deviendra une table ---
            public DbSet<User> Users { get; set; } = null!;
            public DbSet<Role> Roles { get; set; } = null!;
            public DbSet<UserRole> UserRoles { get; set; } = null!; // Table de jointure
            public DbSet<Accommodation> Accommodations { get; set; } = null!;
            // DbSet pour les types concrets d'Accommodation si vous voulez les interroger directement
            // ou si vous utilisez une stratégie d'héritage Table-Per-Type (TPT).
            // Pour Table-Per-Hierarchy (TPH - par défaut), ils ne sont pas strictement nécessaires
            // car vous pouvez interroger Accommodations et utiliser .OfType<Hotel>()
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
            public DbSet<WishlistItem> WishlistItems { get; set; } = null!; // Table de jointure
            public DbSet<Card> Cards { get; set; } = null!;
            public DbSet<Payment> Payments { get; set; } = null!;
            public DbSet<Review> Reviews { get; set; } = null!;
            public DbSet<Comment> Comments { get; set; } = null!;
            public DbSet<Like> Likes { get; set; } = null!;

            // Note: Pas de DbSet pour 'Address' car il sera configuré comme un Owned Entity Type

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder); // Important pour Identity si vous l'utilisez plus tard

                // --- Configuration des relations et des contraintes ---

                // User <-> Role (Many-to-Many via UserRole)
                modelBuilder.Entity<UserRole>()
                    .HasKey(ur => new { ur.UserId, ur.RoleId }); // Clé primaire composite

                modelBuilder.Entity<UserRole>()
                    .HasOne(ur => ur.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(ur => ur.UserId);

                modelBuilder.Entity<UserRole>()
                    .HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId);


                // Wishlist <-> Accommodation (Many-to-Many via WishlistItem)
            modelBuilder.Entity<WishlistItem>(entity => 
{
    // 1. Define the simple, single primary key.
    // The [Key] attribute already does this, but being explicit here is good practice.
    entity.HasKey(wi => wi.WishlistItemId);

    // 2. Configure the relationship to the parent Wishlist.
    entity.HasOne(wi => wi.Wishlist)
        .WithMany(w => w.WishlistItems)
        .HasForeignKey(wi => wi.WishlistId)
        .IsRequired(); // A WishlistItem must belong to a Wishlist.

    // 3. Configure the polymorphic relationships. These are now clean.
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

    // 4. Configure the table-level CHECK constraint.
    entity.ToTable(t => t.HasCheckConstraint("CK_WishlistItem_ExclusiveArc", 
        @"(
            (CASE WHEN [AccommodationId] IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN [RoomId] IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN [DormId] IS NOT NULL THEN 1 ELSE 0 END)
        ) = 1"));
});

                // User <-> Wishlist (One-to-One)
                // La Wishlist est l'entité dépendante, sa PK UserID est aussi sa FK.
                modelBuilder.Entity<User>()
                    .HasOne(u => u.Wishlist)
                    .WithOne(w => w.User)
                    .HasForeignKey<Wishlist>(w => w.UserId);


                // Accommodation -> Address (Owned Entity Type)
                // Address n'aura pas sa propre table, ses colonnes seront dans la table Accommodations.
                modelBuilder.Entity<Accommodation>().OwnsOne(a => a.Address);
                modelBuilder.Entity<Hotel>().OwnsOne(h => h.Address);
                modelBuilder.Entity<Hostel>().OwnsOne(h => h.Address);
                // Relationship 1: To the Accommodation table (optional)
modelBuilder.Entity<Booking>()
    .HasOne(b => b.Accommodation)
    .WithMany(a => a.Bookings) // Assuming Accommodation has ICollection<Booking>
    .HasForeignKey(b => b.AccommodationId)
    .OnDelete(DeleteBehavior.Restrict); // Don't delete an accommodation if it has bookings

// Relationship 2: To the Room table (optional)
modelBuilder.Entity<Booking>()
    .HasOne(b => b.Room)
    .WithMany(r => r.Bookings) // Assuming Room has ICollection<Booking>
    .HasForeignKey(b => b.RoomId)
    .OnDelete(DeleteBehavior.Restrict);

// Relationship 3: To the Dorm table (optional)
modelBuilder.Entity<Booking>()
    .HasOne(b => b.Dorm)
    .WithMany(d => d.Bookings) // Assuming Dorm has ICollection<Booking>
    .HasForeignKey(b => b.DormId)
    .OnDelete(DeleteBehavior.Restrict);
    // --- Add this block for Booking to ensure data integrity ---
modelBuilder.Entity<Booking>()
    .ToTable(t => t.HasCheckConstraint("CK_Booking_ExclusiveArc",
        @"(
            (CASE WHEN [AccommodationId] IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN [RoomId] IS NOT NULL THEN 1 ELSE 0 END) +
            (CASE WHEN [DormId] IS NOT NULL THEN 1 ELSE 0 END)
        ) = 1"));
                
                // Booking <-> Review (One-to-0..1)
            // Une Réservation peut avoir une Review. Review est l'entité dépendante.


            modelBuilder.Entity<Booking>()
                    .HasOne(b => b.Review)
                    .WithOne(r => r.Booking)
                    .HasForeignKey<Review>(r => r.BookingId);

                modelBuilder.Entity<Hotel>()
                .HasMany(h => h.Rooms)
                .WithOne(r => r.Hotel)
                .HasForeignKey(r => r.HotelId)
                .OnDelete(DeleteBehavior.Cascade);

                 modelBuilder.Entity<Hostel>()
                .HasMany(h => h.Dorms)
                .WithOne(d => d.Hostel)
                .HasForeignKey(d => d.HostelId)
                .OnDelete(DeleteBehavior.Cascade);
            // Amenity Many-to-Many relationship
            // EF Core 7+ can configure this implicitly. By defining ICollection<Amenity> on
            // BookableUnit and Hotel, EF will automatically create join tables
            // (e.g., "AmenityBookableUnit" and "AmenityHotel"). No explicit configuration is needed
            // unless you want to customize the join table name or add payload data.

            // --- Unchanged Relationships (verify they still make sense) ---

            // Comment and Like point to Accommodation (standalone properties).
            // This is a reasonable simplification, meaning users comment on/like a Villa or Apartment,
            // not a specific room within a hotel.


                // Booking <-> Payment (One-to-One)
                // Une Réservation a un Paiement. Payment est l'entité dépendante.
                // Si PaymentId sur Booking est nullable, la relation devient 1-à-0..1.
                modelBuilder.Entity<Booking>()
                    .HasOne(b => b.Payment)
                    .WithOne(p=>p.Booking) // Si Payment n'a pas de propriété de navigation vers Booking
                    .HasForeignKey<Payment>(b => b.BookingId); 


                

                // Like (Contrainte d'unicité pour qu'un User ne puisse liker une Accommodation qu'une fois)
                modelBuilder.Entity<Like>()
                .HasKey(l => l.LikeId); // Assuming LikeId is the PK
            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.UserId, l.AccommodationId }).IsUnique();
            modelBuilder.Entity<Like>()
                .HasOne(l => l.Accommodation).WithMany(a => a.Likes).HasForeignKey(l => l.AccommodationId);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Accommodation).WithMany(a => a.Comments).HasForeignKey(c => c.AccommodationId);

                modelBuilder.Entity<User>()
                .HasMany(u => u.ManagedAccommodations)
                .WithOne(a => a.Provider)
                .HasForeignKey(a => a.ProviderId)
                .OnDelete(DeleteBehavior.Restrict);


                 modelBuilder.Entity<Riad>()
                .HasMany(riad => riad.Rooms)         // A Riad has many Rooms
                .WithOne(room => room.Riad)          // A Room has one Riad
                .HasForeignKey(room => room.RiadId)  // The foreign key is RiadId on the Room table
                .OnDelete(DeleteBehavior.Cascade);
                   // If a Riad is deleted, its Rooms are also deleted.

    // 2. Configure the Address as an Owned Entity Type for Riad
    modelBuilder.Entity<Riad>().OwnsOne(riad => riad.Address);

    // 3. Hostel -> Private Room (One-to-Many)
    modelBuilder.Entity<Hostel>()
        .HasMany(hostel => hostel.PrivateRooms) // A Hostel has many PrivateRooms
        .WithOne(room => room.Hostel)           // A Room has one Hostel
        .HasForeignKey(room => room.HostelId)   // The foreign key on Room is HostelId
        .OnDelete(DeleteBehavior.Cascade);
            
                
            }
        
    }
}