using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Models.DTO;

namespace MedicineDoseTracker.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ApiResponse<LoginResponseDTO>> LoginAsync(LoginRequestDTO loginRequestDTO);
    }
}
