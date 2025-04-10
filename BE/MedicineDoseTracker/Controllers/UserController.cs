using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MedicineDoseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IReminderService _reminderService;
        public UserController(IUserService userService, IReminderService reminderService) 
        { 
            _userService = userService;
            _reminderService = reminderService;
        }

        [SwaggerOperation(Summary = "Tạo mới người dùng")]
        [HttpPost]
        public async Task<ApiResponse<bool>> RegisterUser([FromBody] RegisterUserDTO registerUserDto) => await _userService.RegisterUserAsync(registerUserDto);

        [HttpGet("ByLogin")]
        [SwaggerOperation(Summary = "Lấy thông tin user bằng login")]
        [Authorize()]
        public async Task<ApiResponse<UserProfileDTO>> GetUserByLoginAsync() => await _userService.GetUserByLoginAsync();

    }
}
