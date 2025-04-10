using MedicineDoseTracker.Repositories.MedicineRepo;
using MedicineDoseTracker.Repositories.ReminderRepo;
using MedicineDoseTracker.Repositories.UserLoginRepo;
using MedicineDoseTracker.Repositories.UserRepo;

namespace MedicineDoseTracker.Repositories.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public IMedicineRepository MedicineRepository { get; }
        public IUserLoginRepository UserLoginRepository { get; }
        public IReminderRepository ReminderRepository { get; }
        public Task<int> SaveChangeAsync();
    }
}
