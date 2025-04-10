namespace MedicineDoseTracker.Interfaces
{
    public interface IReminderService
    {
        Task SendReminderEmailsAsync();
    }
}
