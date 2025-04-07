using MedicineDoseTracker.Commons;

namespace MedicineDoseTracker.Handler
{
    public static class ResponseHandler
    {
        public static ApiResponse<T> Success<T>(T data, string message = "Successful!")
        {
            return new ApiResponse<T>
            {
                Data = data,
                isSuccess = true,
                Message = message,
            };
        }

        public static ApiResponse<T> Failure<T>(string message)
        {
            return new ApiResponse<T>
            {
                Data = default(T),
                isSuccess = false,
                Message = message,

            };
        }
    }
}
