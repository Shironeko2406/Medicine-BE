using MedicineDoseTracker.Interfaces;

namespace MedicineDoseTracker.Services
{
    public class CurrentTimeService : ICurrentTimeService
    {
        public DateTime GetCurrentTime()
        {
            var vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            var currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);

            return currentTime;
        }
    }
}
