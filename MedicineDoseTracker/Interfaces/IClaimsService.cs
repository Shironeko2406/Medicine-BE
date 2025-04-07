﻿namespace MedicineDoseTracker.Interfaces
{
    public interface IClaimsService
    {
        public Guid GetCurrentUserId();
        public string GetCurrentUserName();
        public string GetCurrentUserEmail();
    }
}
