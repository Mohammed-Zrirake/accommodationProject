using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("UserRoles")]
    public class UserRole
    {

        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; } = null!;

        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;
    }
}
