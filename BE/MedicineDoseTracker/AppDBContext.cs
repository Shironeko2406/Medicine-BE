using MedicineDoseTracker.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace MedicineDoseTracker
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
    }
}
