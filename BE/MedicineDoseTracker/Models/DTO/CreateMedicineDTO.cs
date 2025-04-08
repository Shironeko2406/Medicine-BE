namespace MedicineDoseTracker.Models.DTO
{
    public class CreateMedicineDTO
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
    }
}
