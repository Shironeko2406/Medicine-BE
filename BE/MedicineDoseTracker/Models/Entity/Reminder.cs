using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.Entity
{
    public class Reminder
    {
        [Key]
        public Guid ReminderId { get; set; }

        [Required]
        public Guid MedicineId { get; set; } // Foreign Key

        [Required]
        public DateTime ReminderTime { get; set; } // Thời gian nhắc nhở

        [Required, MaxLength(50)]
        public string NotificationType { get; set; } // Email hoặc SMS

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        [ForeignKey("MedicineId")]
        public Medicine Medicine { get; set; }
    }
}
