using MedicineDoseTracker.Enums;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.DTO
{
    public class UserProfileDTO
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string? SrcAvatar { get; set; } // Đường dẫn ảnh đại diện
        public GenderEnum Gender { get; set; } // Giới tính
    }
}
