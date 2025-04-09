using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.Entity
{
    public class Medicine
    {
        [Key]
        public Guid MedicineId { get; set; }
        [Required]
        public Guid UserId { get; set; } 
        [Required, MaxLength(255)]
        public string Name { get; set; } 
        [Required, MaxLength(255)]
        public string Dosage { get; set; }
        [Required, MaxLength(255)]
        public string Frequency { get; set; }
        [MaxLength(500)] // <-- Thêm trường ảnh ở đây
        public string? SrcImg { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsDeleted { get; set; } = false;
        // Navigation property
        [ForeignKey("UserId")]
        public Users User { get; set; }
        public ICollection<Reminder> Reminders { get; set; }
    }
}
