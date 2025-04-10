using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.ReminderRepo;

namespace MedicineDoseTracker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly IReminderRepository _reminderRepository;
        private readonly IEmailService _emailService;
        public ReminderService(IReminderRepository reminderRepository, IEmailService emailService)
        { 
            _reminderRepository = reminderRepository;
            _emailService = emailService;
        }
        public async Task SendReminderEmailsAsync()
        {
            var reminders = await _reminderRepository.GetRemindersToSendAsync();

            foreach (var reminder in reminders)
            {
                var user = reminder.Medicine.User;

                var email = new MessageEmailDTO
                {
                    To = user.Email,
                    Subject = "⏰ Nhắc nhở uống thuốc",
                    Body = $"Xin chào {user.FullName},<br>Bạn cần uống thuốc <b>{reminder.Medicine.Name}</b> theo liều <b>{reminder.Medicine.Dosage}</b> lúc {reminder.ReminderTime:HH:mm dd/MM/yyyy}."
                };

                await _emailService.SendEmailRegisterUserAsync(email);
            }
        }
    }
}
