using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.Entity
{
    public class Reminder
    {
        [Key]
        public Guid ReminderId { get; set; }
        [Required]
        public Guid MedicineId { get; set; }
        [Required]
        public DateTime ReminderTime { get; set; } 
        // Navigation property
        [ForeignKey("MedicineId")]
        public Medicine Medicine { get; set; }
    }
}
