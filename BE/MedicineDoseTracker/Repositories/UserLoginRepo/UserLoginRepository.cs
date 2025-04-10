using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace MedicineDoseTracker.Repositories.UserLoginRepo
{
    public class UserLoginRepository : GenericRepository<UserLogin>, IUserLoginRepository
    {
        private readonly AppDBContext _dbContext;
        public UserLoginRepository(AppDBContext context) : base(context)
        {
            _dbContext = context;
        }

        public async Task<UserLogin?> GetByRefreshTokenAsync(string refreshToken)
        {
            return await _dbContext.UserLogins
                .Include(ul => ul.User)
                .FirstOrDefaultAsync(ul => ul.RefreshToken == refreshToken);
        }
    }
}
