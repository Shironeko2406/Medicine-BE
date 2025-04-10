using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Handler;
using MedicineDoseTracker.Helper;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.UnitOfWork;
using MedicineDoseTracker.Repositories.UserLoginRepo;

namespace MedicineDoseTracker.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJWTService _jwtService;

        public AuthenticationService(IUnitOfWork unitOfWork, IJWTService jwtService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
        }
        public async Task<ApiResponse<LoginResponseDTO>> LoginAsync(LoginRequestDTO loginRequestDTO)
        {
            var response = new ApiResponse<LoginResponseDTO>();

            try
            {
                // Retrieve user by username from the database
                var user = await _unitOfWork.UserRepository.GetUserByUserName(loginRequestDTO.Username);
                if (user == null)
                {
                    return ResponseHandler.LogicFailure<LoginResponseDTO>("Invalid username or password.");
                }

                // Compare the password hash
                if (!PasswordHelper.VerifyPassword(loginRequestDTO.Password, user.PasswordHash))
                {
                    // If password is incorrect
                    return ResponseHandler.LogicFailure<LoginResponseDTO>("Invalid username or password.");
                }

                // Generate JWT token
                var token = _jwtService.GenerateJWT(user);
                var refreshToken = _jwtService.GenerateRefreshToken();

                // 3. Tạo thời hạn của RefreshToken (ví dụ 7 ngày)
                var refreshTokenExpiry = DateTime.UtcNow.AddDays(7);

                var userLogin = new UserLogin
                {
                    Id = Guid.NewGuid(),
                    UserId = user.UserId,
                    RefreshToken = refreshToken,
                    RefreshTokenExpiryTime = refreshTokenExpiry,
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.UserLoginRepository.AddAsync(userLogin);
                await _unitOfWork.SaveChangeAsync();
                // Prepare the response with the token and user details
                var loginResponse = new LoginResponseDTO
                {
                    AccessToken = token,
                    RefreshToken = refreshToken
                };
                return ResponseHandler.Success(loginResponse, "Login successful.");
            }
            catch (Exception ex)
            {
                // Catch unexpected errors and return a failure response
                return ResponseHandler.Failure<LoginResponseDTO>($"An error occurred: {ex.Message}");
            }

        }

        public async Task<ApiResponse<LoginResponseDTO>> RefreshTokenAsync(RefreshTokenRequestDTO request)
        {
            var response = new ApiResponse<LoginResponseDTO>();

            try
            {
                var principal = _jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
                if (principal == null)
                    return ResponseHandler.LogicFailure<LoginResponseDTO>("Invalid access token.");

                var userId = Guid.Parse(principal.FindFirst("UserId")?.Value ?? string.Empty);
                var userLogin = await _unitOfWork.UserLoginRepository.GetByRefreshTokenAsync(request.RefreshToken);

                if (userLogin == null || userLogin.RefreshTokenExpiryTime <= DateTime.UtcNow)
                    return ResponseHandler.LogicFailure<LoginResponseDTO>("Invalid or expired refresh token.");

                // Lấy user từ DB
                var user = await _unitOfWork.UserRepository.GetByIdAsync(userId);
                if (user == null)
                    return ResponseHandler.LogicFailure<LoginResponseDTO>("User not found.");

                // Tạo token mới
                var newAccessToken = _jwtService.GenerateJWT(user);
                var newRefreshToken = _jwtService.GenerateRefreshToken();

                // Cập nhật token trong DB
                userLogin.RefreshToken = newRefreshToken;
                userLogin.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                await _unitOfWork.SaveChangeAsync();

                var tokenResponse = new LoginResponseDTO
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                };

                return ResponseHandler.Success(tokenResponse, "Token refreshed successfully.");
            }
            catch (Exception ex)
            {
                return ResponseHandler.Failure<LoginResponseDTO>($"Error: {ex.Message}");
            }
        }
    }
}
