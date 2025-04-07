using System.ComponentModel.DataAnnotations;

namespace MedicineDoseTracker.Models.DTO
{
    public class MedicineDTO
    {
        public Guid MedicineId { get; set; }
        public string Name { get; set; } // Tên thuốc
        public string Dosage { get; set; } // Liều lượng (vd: 500mg)
        public string Frequency { get; set; } // Tần suất (vd: 2 lần/ngày)
        public DateTime CreatedAt { get; set; } 
    }
}
