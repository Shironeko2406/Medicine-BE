using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;

namespace MedicineDoseTracker.Interfaces
{
    public interface IMedicineService
    {
        Task<ApiResponse<bool>> CreateMedicineAsync(CreateMedicineDTO createMedicineDTO);
        Task<ApiResponse<List<MedicineDTO>>> GetMedicinesByUserLoginAsync();
        Task<ApiResponse<bool>> DeleteMedicineByIdAsync(string medicineId);
        Task<ApiResponse<bool>> UpdateMedicineByIdAsync(string medicineId, UpdateMedicineDTO updateMedicineDTO);
        Task<ApiResponse<MedicineDTO>> GetMedicineByIdAsync(string medicineId);
    }
}
