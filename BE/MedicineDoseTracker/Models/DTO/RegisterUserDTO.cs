using MedicineDoseTracker.Enums;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.DTO
{
    public class RegisterUserDTO
    {
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
        public GenderEnum Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

    }
}
