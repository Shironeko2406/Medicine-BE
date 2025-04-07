using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MimeKit;
using MailKit.Net.Smtp;

namespace MedicineDoseTracker.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration) 
        {
            _configuration = configuration;
        }
        public async Task<bool> SendEmailRegisterUserAsync(MessageEmailDTO messageEmail)
        {
            try
            {
                var emailSettings = _configuration.GetSection("EmailSettings");

                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
                email.To.Add(new MailboxAddress("", messageEmail.To));
                email.Subject = messageEmail.Subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = messageEmail.Body };
                email.Body = bodyBuilder.ToMessageBody();

                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["Port"]), MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["Password"]);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi gửi mail: {ex.Message}");
                return false;
            }
        }
    }
}
