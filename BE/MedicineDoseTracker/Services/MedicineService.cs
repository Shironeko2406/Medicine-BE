using AutoMapper;
using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Handler;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;
using MedicineDoseTracker.Repositories.UnitOfWork;

namespace MedicineDoseTracker.Services
{
    public class MedicineService : IMedicineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClaimsService _claimsService;
        private readonly IMapper _mapper;

        public MedicineService(IUnitOfWork unitOfWork, IClaimsService claimsService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _claimsService = claimsService;
            _mapper = mapper;
        }

        public async Task<ApiResponse<bool>> CreateMedicineAsync(CreateMedicineDTO createMedicineDTO)
        {
            var response = new ApiResponse<bool>();
            try
            {
                // Kiểm tra xem người dùng có tồn tại không
                var user = await _unitOfWork.UserRepository.GetByIdAsync(createMedicineDTO.UserId);
                if (user == null)
                {
                    return ResponseHandler.Failure<bool>("Người dùng không tồn tại.");
                }

                // Tạo đối tượng Medicine mới
                var medicine = new Medicine
                {
                    UserId = createMedicineDTO.UserId,
                    Name = createMedicineDTO.Name,
                    Dosage = createMedicineDTO.Dosage,
                    Frequency = createMedicineDTO.Frequency,
                };

                // Thêm vào database
                await _unitOfWork.MedicineRepository.AddAsync(medicine);
                await _unitOfWork.SaveChangeAsync();

                return ResponseHandler.Success(true, "Tạo đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                return ResponseHandler.Failure<bool>($"Lỗi khi tạo đơn thuốc: {ex.Message}");
            }
        }
        public async Task<ApiResponse<List<MedicineDTO>>> GetMedicinesByUserLoginAsync()
        {
            var response = new ApiResponse<List<Medicine>>();
            try
            {
                // Lấy UserId từ token thông qua ClaimsService
                var userId = _claimsService.GetCurrentUserId();

                if (userId == Guid.Empty)
                {
                    return ResponseHandler.Failure<List<MedicineDTO>>("User is not logged in");
                }
                var medicines = await _unitOfWork.MedicineRepository.GetMedicinesByUserIdAsync(userId);

                if (medicines == null || !medicines.Any())
                {
                    return ResponseHandler.Failure<List<MedicineDTO>>("No medicines found for the user");
                }

                // Chuyển đổi từ Entity sang DTO
                var medicineDTOs = _mapper.Map<List<MedicineDTO>>(medicines);

                // Trả về kết quả thành công
                return ResponseHandler.Success(medicineDTOs, "Medicines retrieved successfully");

            }
            catch (Exception ex)
            {
                return ResponseHandler.Failure<List<MedicineDTO>>($"An error occurred: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> DeleteMedicineByIdAsync(string medicineId)
        {
            var response = new ApiResponse<bool>();

            try
            {
                var medicine = await _unitOfWork.MedicineRepository.GetByIdAsync(Guid.Parse(medicineId));

                if (medicine == null)
                {
                    return ResponseHandler.Failure<bool>("Đơn thuốc không tồn tại.");
                }

                _unitOfWork.MedicineRepository.SoftDelete(medicine);
                await _unitOfWork.SaveChangeAsync();

                return ResponseHandler.Success(true, "Xoá đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                return ResponseHandler.Failure<bool>($"Lỗi khi xoá đơn thuốc: {ex.Message}");
            }
        }

        public async Task<ApiResponse<bool>> UpdateMedicineByIdAsync(string medicineId, UpdateMedicineDTO updateMedicineDTO)
        {
            try
            {
                // Lấy userId từ claims (người dùng hiện tại đang đăng nhập)
                var userId = _claimsService.GetCurrentUserId();

                // Kiểm tra xem userId từ claims có hợp lệ không
                if (userId == Guid.Empty)
                {
                    return ResponseHandler.Failure<bool>("Người dùng không hợp lệ.");
                }

                // Kiểm tra xem đơn thuốc có tồn tại không
                var medicine = await _unitOfWork.MedicineRepository.GetByIdAsync(Guid.Parse(medicineId));

                if (medicine == null)
                {
                    return ResponseHandler.Failure<bool>("Đơn thuốc không tồn tại.");
                }

                // Kiểm tra xem người dùng có phải là người sở hữu đơn thuốc không
                if (medicine.UserId != userId)
                {
                    return ResponseHandler.Failure<bool>("Bạn không có quyền sửa đổi đơn thuốc này.");
                }

                _mapper.Map(updateMedicineDTO, medicine);

                // Cập nhật vào database
                await _unitOfWork.MedicineRepository.UpdateAsync(medicine);
                await _unitOfWork.SaveChangeAsync();

                return ResponseHandler.Success(true, "Cập nhật đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                return ResponseHandler.Failure<bool>($"Lỗi khi cập nhật đơn thuốc: {ex.Message}");
            }
        }

        public async Task<ApiResponse<MedicineDTO>> GetMedicineByIdAsync(string medicineId)
        {
            try
            {
                var userId = _claimsService.GetCurrentUserId();

                var medicine = await _unitOfWork.MedicineRepository.GetByIdAsync(Guid.Parse(medicineId));

                // Kiểm tra nếu không tìm thấy thuốc
                if (medicine == null || medicine.IsDeleted)
                {
                    return ResponseHandler.Failure<MedicineDTO>("Không tìm thấy đơn thuốc.");
                }
                if (medicine.UserId != userId)
                {
                    return ResponseHandler.Failure<MedicineDTO>("Bạn không có quyền truy cập đơn thuốc này.");
                }

                // Chuyển đổi từ Entity sang DTO
                var medicineDTO = _mapper.Map<MedicineDTO>(medicine);

                // Trả về kết quả thành công
                return ResponseHandler.Success(medicineDTO, "Lấy thông tin đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return ResponseHandler.Failure<MedicineDTO>($"Lỗi khi lấy thông tin đơn thuốc: {ex.Message}");
            }
        }
    }
}
