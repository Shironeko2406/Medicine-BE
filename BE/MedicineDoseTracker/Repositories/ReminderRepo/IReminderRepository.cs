using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.Generic;

namespace MedicineDoseTracker.Repositories.ReminderRepo
{
    public interface IReminderRepository : IGenericRepository<Reminder>
    {
        Task<List<Reminder>> GetRemindersToSendAsync();
    }
}
