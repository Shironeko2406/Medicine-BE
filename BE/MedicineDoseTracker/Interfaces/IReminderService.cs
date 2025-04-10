using MedicineDoseTracker.Models.DTO;

namespace MedicineDoseTracker.Interfaces
{
    public interface IReminderService
    {
        Task<List<UserMedicineInfoDTO>> GetUserMedicinesForEmailAsync();

    }
}
