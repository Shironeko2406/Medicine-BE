using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.Entity
{
    public class UserLogin
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public Users User { get; set; }

        [Required]
        public string RefreshToken { get; set; }

        public DateTime RefreshTokenExpiryTime { get; set; }

        public string? DeviceInfo { get; set; }
        public string? IPAddress { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
