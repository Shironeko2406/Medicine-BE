﻿namespace MedicineDoseTracker.Models.DTO
{
    public class UserMedicineInfoDTO
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<MedicineDTO> Medicines { get; set; }
    }
}
