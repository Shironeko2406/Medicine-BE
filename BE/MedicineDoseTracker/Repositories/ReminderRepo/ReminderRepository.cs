using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;
using Microsoft.EntityFrameworkCore;

namespace MedicineDoseTracker.Repositories.ReminderRepo
{
    public class ReminderRepository : GenericRepository<Reminder>, IReminderRepository
    {
        private readonly AppDBContext _context;
        private readonly ICurrentTimeService _timeService;
        public ReminderRepository(AppDBContext context, ICurrentTimeService timeService) : base(context)
        {
            _context = context;
            _timeService = timeService;
        }

        public async Task<List<Reminder>> GetRemindersToSendAsync()
        {
            var now = _timeService.GetCurrentTime();

            return await _context.Reminders
                .Include(r => r.Medicine)
                    .ThenInclude(m => m.User)
                .Where(r => r.ReminderTime <= now && !r.Medicine.IsDeleted)
                .ToListAsync();
        }
    }
}
