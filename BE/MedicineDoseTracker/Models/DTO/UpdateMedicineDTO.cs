namespace MedicineDoseTracker.Models.DTO
{
    public class UpdateMedicineDTO
    {
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public string? SrcImg { get; set; }

    }
}
