using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.UnitOfWork;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Enums;
using BCrypt.Net;
using MedicineDoseTracker.Helper;
using Microsoft.AspNetCore.Http.HttpResults;
using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Handler;
using AutoMapper;
using FluentValidation;
using FluentValidation.Results;

namespace MedicineDoseTracker.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEmailService _emailService;
        private readonly IClaimsService _claimsService;
        private readonly IMapper _mapper;
        private readonly IValidator<RegisterUserDTO> _validator;
        public UserService(IUnitOfWork unitOfWork, IEmailService emailService, IClaimsService claimsService, IMapper mapper, IValidator<RegisterUserDTO> validator) { 
            _unitOfWork = unitOfWork;
            _emailService = emailService;
            _claimsService = claimsService;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<ApiResponse<bool>> RegisterUserAsync(RegisterUserDTO register)
        {
            var response = new ApiResponse<bool>();
            try
            {
                // ✅ Validate dữ liệu
                ValidationResult validationResult = await _validator.ValidateAsync(register);
                if (!validationResult.IsValid)
                {
                    var errors = string.Join(" & ", validationResult.Errors.Select(e => e.ErrorMessage));
                    return ResponseHandler.Failure<bool>(errors);
                }
                // Tạo người dùng mới từ thông tin đăng ký
                var userCreate = new Users
                {
                    UserName = register.UserName,
                    FullName = register.FullName,
                    Email = register.Email,
                    PasswordHash = PasswordHelper.HashPassword(register.PasswordHash),
                    Gender = register.Gender,
                    SrcAvatar = register.SrcAvatar,
                    DateOfBirth = register.DateOfBirth,
                };

                // Thêm người dùng mới vào cơ sở dữ liệu
                await _unitOfWork.UserRepository.AddAsync(userCreate);
                await _unitOfWork.SaveChangeAsync();

                // Gửi email thông báo đăng ký thành công
                var emailMessage = new MessageEmailDTO
                {
                    To = register.Email,
                    Subject = "Chào mừng bạn đến với Medicine Dose Tracker!",
                    Body = $"Xin chào {register.FullName},<br><br>Cảm ơn bạn đã đăng ký. Chúc bạn một ngày tốt lành!<br><br>Trân trọng,<br>Medicine Dose Tracker Team"
                };

                await _emailService.SendEmailRegisterUserAsync(emailMessage);

                // Trả về kết quả thành công với thông tin người dùng đã đăng ký
                response = ResponseHandler.Success(true, "Đăng ký thành công!");
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết ra Console hoặc Logger (tùy theo ứng dụng của bạn)
                Console.WriteLine($"Lỗi: {ex.Message}");

                // Trả về thông báo lỗi cho người dùng
                response = ResponseHandler.Failure<bool>("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.");
            }
            return response;
        }

        public Task<ApiResponse<bool>> UpdateUserByIdAsync(string id, UpdateUserDTO updateUser)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<UserProfileDTO>> GetUserByLoginAsync()
        {
            try
            {
                // Lấy UserId từ claims (người dùng hiện tại đang đăng nhập thông qua token)
                var userId = _claimsService.GetCurrentUserId();

                // Kiểm tra xem userId có hợp lệ không
                if (userId == Guid.Empty)
                {
                    return ResponseHandler.Failure<UserProfileDTO>("Token không hợp lệ hoặc người dùng không đăng nhập.");
                }

                // Lấy thông tin người dùng từ cơ sở dữ liệu theo UserId
                var user = await _unitOfWork.UserRepository.GetByIdAsync(userId);

                // Kiểm tra nếu không tìm thấy người dùng
                if (user == null)
                {
                    return ResponseHandler.Failure<UserProfileDTO>("Không tìm thấy người dùng.");
                }

                var userProfileDTO = _mapper.Map<UserProfileDTO>(user);

                // Trả về kết quả thành công
                return ResponseHandler.Success(userProfileDTO, "Lấy thông tin người dùng thành công.");
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return ResponseHandler.Failure<UserProfileDTO>($"Lỗi khi lấy thông tin người dùng: {ex.Message}");
            }
        }
    }
}
