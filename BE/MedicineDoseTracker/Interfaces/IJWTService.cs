using MedicineDoseTracker.Models.Entity;

namespace MedicineDoseTracker.Interfaces
{
    public interface IJWTService
    {
        public string GenerateJWT(Users user);
        public string GenerateRefreshToken();

    }
}
