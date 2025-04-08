using MedicineDoseTracker.Enums;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.DTO
{
    public class UpdateUserDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; } // Lưu mật khẩu đã hash
        public string? SrcAvatar { get; set; } // Đường dẫn ảnh đại diện
        public GenderEnum Gender { get; set; } // Giới tính
        public DateTime DateOfBirth { get; set; }

    }
}
