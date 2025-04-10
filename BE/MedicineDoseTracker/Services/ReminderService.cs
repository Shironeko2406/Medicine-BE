using AutoMapper;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.ReminderRepo;
using MedicineDoseTracker.Repositories.UnitOfWork;

namespace MedicineDoseTracker.Services
{
    public class ReminderService : IReminderService
    {
        private readonly IReminderRepository _reminderRepository;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;


        public ReminderService(IReminderRepository reminderRepository, IEmailService emailService, IMapper mapper, IUnitOfWork unitOfWork)
        { 
            _reminderRepository = reminderRepository;
            _emailService = emailService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<UserMedicineInfoDTO>> GetUserMedicinesForEmailAsync()
        {
            var users = await _unitOfWork.UserRepository.GetUsersWithMedicinesAsync();

            var result = users.Select(user => new UserMedicineInfoDTO
            {
                Email = user.Email,
                UserName = user.UserName,
                Medicines = user.Medicines
                    .Where(m => !m.IsDeleted)
                    .Select(m => _mapper.Map<MedicineDTO>(m))
                    .ToList()
            }).ToList();

            return result;
        }
    }
}
