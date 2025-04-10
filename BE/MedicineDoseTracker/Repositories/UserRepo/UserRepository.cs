using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;
using MedicineDoseTracker.Repositories.UserRepo;
using Microsoft.EntityFrameworkCore;
using System;

namespace MedicineDoseTracker.Repositories.User
{
    public class UserRepository : GenericRepository<Users> , IUserRepository
    {
        private readonly AppDBContext _dbContext;

        public UserRepository(AppDBContext context) : base(context)
        {
           _dbContext = context;
        }

        public async Task<Users> GetUserByUserName(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == username);
            return user;
        }

        public async Task<List<Users>> GetUsersWithMedicinesAsync()
        {
            return await _dbContext.Users
                    .Where(u => u.Medicines.Any(m => !m.IsDeleted))
                    .Include(u => u.Medicines)
                    .ToListAsync();
        }
    }
}
