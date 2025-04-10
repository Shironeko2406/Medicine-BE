using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace MedicineDoseTracker.Repositories.MedicineRepo
{
    public class MedicineRepository : GenericRepository<Medicine>, IMedicineRepository
    {
        private readonly AppDBContext _dbContext;
        public MedicineRepository(AppDBContext context) : base(context)
        {
            _dbContext = context;
        }

        public async Task<IEnumerable<Medicine>> GetMedicinesByUserIdAsync(Guid userId)
        {
            return await _dbContext.Set<Medicine>()
                                 .Where(m => m.UserId == userId && m.IsDeleted != true)
                                 .ToListAsync();
        }

        
    }
}
