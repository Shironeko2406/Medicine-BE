using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;
using Microsoft.AspNetCore.Identity.Data;

namespace MedicineDoseTracker.Interfaces
{
    public interface IUserService
    {
        Task<ApiResponse<bool>> RegisterUserAsync(RegisterUserDTO register);
        Task<ApiResponse<bool>> UpdateUserByIdAsync(string id, UpdateUserDTO updateUser);
        Task<ApiResponse<UserProfileDTO>> GetUserByLoginAsync();
    }
}
