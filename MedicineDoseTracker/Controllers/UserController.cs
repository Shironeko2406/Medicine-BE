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
        public UserController(IUserService userService) 
        { 
            _userService = userService;
        }

        [SwaggerOperation(Summary = "Tạo mới người dùng")]
        [HttpPost]
        public async Task<ApiResponse<bool>> RegisterUser([FromBody] RegisterUserDTO registerUserDto) => await _userService.RegisterUserAsync(registerUserDto);

        [HttpGet("ByLogin")]
        [Authorize()]
        public async Task<ApiResponse<UserProfileDTO>> GetUserByLoginAsync() => await _userService.GetUserByLoginAsync();

    }
}
