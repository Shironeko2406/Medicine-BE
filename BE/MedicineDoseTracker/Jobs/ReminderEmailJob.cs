using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Repositories.ReminderRepo;
using Quartz;

namespace MedicineDoseTracker.Jobs
{
    public class ReminderEmailJob : IJob
    {
        private readonly IReminderRepository _reminderRepo;
        private readonly IEmailService _emailService;
        private readonly ICurrentTimeService _timeService;

        public ReminderEmailJob(IReminderRepository reminderRepo, IEmailService emailService, ICurrentTimeService timeService)
        {
            _reminderRepo = reminderRepo;
            _emailService = emailService;
            _timeService = timeService;
        }
        public Task Execute(IJobExecutionContext context)
        {
            throw new NotImplementedException();
        }
    }
}
