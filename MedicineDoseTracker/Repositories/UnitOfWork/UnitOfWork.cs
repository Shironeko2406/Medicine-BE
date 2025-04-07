using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.MedicineRepo;
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

        public UnitOfWork(AppDBContext context, IUserRepository userRepository, IMedicineRepository medicineRepository)
        {
            _dbContext = context;
            _userRepository = userRepository;
            _medicineRepository = medicineRepository;
        }

        public IUserRepository UserRepository => _userRepository;
        public IMedicineRepository MedicineRepository => _medicineRepository;
        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
