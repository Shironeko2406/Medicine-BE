using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;

namespace MedicineDoseTracker.Repositories.MedicineRepo
{
    public interface IMedicineRepository : IGenericRepository<Medicine>
    {
        Task<IEnumerable<Medicine>> GetMedicinesByUserIdAsync(Guid userId);

    }
}
