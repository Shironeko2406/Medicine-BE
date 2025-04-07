using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.Entity
{
    public class Medicine
    {
        [Key]
        public Guid MedicineId { get; set; }

        [Required]
        public Guid UserId { get; set; } // Foreign Key

        [Required, MaxLength(255)]
        public string Name { get; set; } // Tên thuốc

        [Required, MaxLength(255)]
        public string Dosage { get; set; } // Liều lượng (vd: 500mg)

        [Required, MaxLength(255)]
        public string Frequency { get; set; } // Tần suất (vd: 2 lần/ngày)

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;
        // Navigation property
        [ForeignKey("UserId")]
        public Users User { get; set; }

        public ICollection<Reminder> Reminders { get; set; }
    }
}
