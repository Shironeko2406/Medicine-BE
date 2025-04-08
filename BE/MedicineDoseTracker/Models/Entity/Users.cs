using MedicineDoseTracker.Enums;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace MedicineDoseTracker.Models.Entity
{
    public class Users
    {
        [Key]
        public Guid UserId { get; set; }
        public string UserName { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } // Lưu mật khẩu đã hash

        [MaxLength(500)]
        public string? SrcAvatar { get; set; } // Đường dẫn ảnh đại diện

        [Required]
        public GenderEnum Gender { get; set; } // Giới tính
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        // Navigation property
        public ICollection<Medicine> Medicines { get; set; }
    }
}
