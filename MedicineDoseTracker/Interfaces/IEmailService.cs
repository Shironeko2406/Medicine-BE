using MedicineDoseTracker.Models.DTO;

namespace MedicineDoseTracker.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailRegisterUserAsync(MessageEmailDTO messageEmail);
    }
}
