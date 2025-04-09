using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Handler;
using MedicineDoseTracker.Helper;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.UnitOfWork;

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

                // Prepare the response with the token and user details
                var loginResponse = new LoginResponseDTO
                {
                    AccessToken = token
                };
                return ResponseHandler.Success(loginResponse, "Login successful.");
            }
            catch (Exception ex)
            {
                // Catch unexpected errors and return a failure response
                return ResponseHandler.Failure<LoginResponseDTO>($"An error occurred: {ex.Message}");
            }

        }
    }
}
