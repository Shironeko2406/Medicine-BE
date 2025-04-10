using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;

namespace MedicineDoseTracker.Repositories.UserLoginRepo
{
    public interface IUserLoginRepository : IGenericRepository<UserLogin>
    {
        Task<UserLogin?> GetByRefreshTokenAsync(string refreshToken);
    }
}
