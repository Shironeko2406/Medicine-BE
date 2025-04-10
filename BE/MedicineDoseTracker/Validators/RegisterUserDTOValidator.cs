using FluentValidation;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.UnitOfWork;

namespace MedicineDoseTracker.Validators
{
    public class RegisterUserDTOValidator : AbstractValidator<RegisterUserDTO>
    {
        private readonly IUnitOfWork _unitOfWork;

        public RegisterUserDTOValidator(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("Username is required.")
                .MustAsync(async (username, cancellation) =>
                {
                    return !await _unitOfWork.UserRepository.AnyAsync(u => u.UserName == username);
                })
                .WithMessage("Username already exists.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.")
                .MustAsync(async (email, cancellation) =>
                {
                    return !await _unitOfWork.UserRepository.AnyAsync(u => u.Email == email);
                })
                .WithMessage("Email is already in use.");
        }
    }
}
