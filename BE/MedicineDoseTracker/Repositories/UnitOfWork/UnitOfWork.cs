using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.MedicineRepo;
using MedicineDoseTracker.Repositories.ReminderRepo;
using MedicineDoseTracker.Repositories.UserLoginRepo;
using MedicineDoseTracker.Repositories.UserRepo;
using Microsoft.EntityFrameworkCore;
using System;

namespace MedicineDoseTracker.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDBContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly IMedicineRepository _medicineRepository;
        private readonly IUserLoginRepository _userLoginRepository;
        private readonly IReminderRepository _reminderRepository;


        public UnitOfWork(AppDBContext context, IUserRepository userRepository, IMedicineRepository medicineRepository, IUserLoginRepository userLoginRepository, IReminderRepository reminderRepository)
        {
            _dbContext = context;
            _userRepository = userRepository;
            _medicineRepository = medicineRepository;
            _userLoginRepository = userLoginRepository;
            _reminderRepository = reminderRepository;
        }

        public IUserRepository UserRepository => _userRepository;
        public IMedicineRepository MedicineRepository => _medicineRepository;

        public IUserLoginRepository UserLoginRepository => _userLoginRepository;

        public IReminderRepository ReminderRepository => _reminderRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
