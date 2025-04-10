using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;

namespace MedicineDoseTracker.Repositories.UserRepo
{
    public interface IUserRepository : IGenericRepository<Users>
    {
        Task<Users> GetUserByUserName(string username);
        Task<List<Users>> GetUsersWithMedicinesAsync();

    }
}
