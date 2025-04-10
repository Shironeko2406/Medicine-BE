using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.ReminderRepo;
using MedicineDoseTracker.Repositories.UnitOfWork;
using MedicineDoseTracker.Services;
using Quartz;

namespace MedicineDoseTracker.Jobs
{
    public class ReminderEmailJob : IJob
    {
        private readonly IEmailService _emailService;
        private readonly ICurrentTimeService _timeService;
        private readonly IReminderService _reminderService;


        public ReminderEmailJob(IEmailService emailService, ICurrentTimeService timeService, IReminderService reminderService)
        {
            _emailService = emailService;
            _timeService = timeService;
            _reminderService = reminderService;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine($"[Quartz] ReminderEmailJob chạy lúc: {DateTime.Now}");

            var userList = await _reminderService.GetUserMedicinesForEmailAsync();

            foreach (var user in userList)
            {
                var medicineListHtml = string.Join("<br/>", user.Medicines.Select(m =>
                    $"{m.Name} - {m.Dosage} ({m.Frequency})"));

                var message = new MessageEmailDTO
                {
                    To = user.Email,
                    Subject = "⏰ Nhắc nhở uống thuốc hôm nay",
                    Body = $"<p>Chào {user.UserName},</p>" +
                           $"<p>Dưới đây là danh sách thuốc bạn cần uống:</p>" +
                           $"<p>{medicineListHtml}</p>" +
                           $"<p>Nhớ uống thuốc đúng giờ nhé! 💊</p>"
                };

                await _emailService.SendEmailRegisterUserAsync(message);
            }
        }


    }
}
