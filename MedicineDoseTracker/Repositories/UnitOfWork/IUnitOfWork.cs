using MedicineDoseTracker.Repositories.MedicineRepo;
using MedicineDoseTracker.Repositories.UserRepo;

namespace MedicineDoseTracker.Repositories.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public IMedicineRepository MedicineRepository { get; }
        public Task<int> SaveChangeAsync();
    }
}
