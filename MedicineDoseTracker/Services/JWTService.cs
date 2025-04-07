using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.Entity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MedicineDoseTracker.Services
{
    public class JWTService : IJWTService
    {
        private readonly IConfiguration _configuration;

        public JWTService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GenerateJWT(Users user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];

            var claims = new[]
            {
                new Claim("UserId", user.UserId.ToString()), // UserId làm Claim
                new Claim("UserName", user.UserName), // UserName làm Claim
                new Claim("Email", user.Email), // Email làm Claim
                new Claim("Gender", user.Gender.ToString()), // Gender làm Claim
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Thêm JTI cho Token
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
