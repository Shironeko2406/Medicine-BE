using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MedicineDoseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [SwaggerOperation(Summary = "đăng nhập bằng UserName và Password")]
        [HttpPost("login")]
        public async Task<ApiResponse<LoginResponseDTO>> LoginAsync(LoginRequestDTO loginRequestDTO)
        {
            return await _authenticationService.LoginAsync(loginRequestDTO);
        }

        [SwaggerOperation(Summary = "Làm mới Access Token từ Refresh Token")]
        [HttpPut("refresh-token")]
        public async Task<ApiResponse<LoginResponseDTO>> RefreshToken(RefreshTokenRequestDTO request)
        {
            return await _authenticationService.RefreshTokenAsync(request);
        }
    }
}
