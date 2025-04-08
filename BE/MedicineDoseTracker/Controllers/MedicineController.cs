using MedicineDoseTracker.Commons;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MedicineDoseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineService _medicineService;

        public MedicineController(IMedicineService medicineService)
        {
            _medicineService = medicineService; 
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Tạo mới đơn thuốc")]
        public async Task<ApiResponse<bool>> CreateMedicineAsync(CreateMedicineDTO createMedicine)
        {
            return await _medicineService.CreateMedicineAsync(createMedicine);
        }

        [Authorize()]
        [SwaggerOperation(Summary = "Lấy danh sách đơn thuốc theo login")]
        [HttpGet("ByLogin")]
        public async Task<ApiResponse<List<MedicineDTO>>> GetMedicinesByUserLoginAsync()
        {
            return await _medicineService.GetMedicinesByUserLoginAsync();
        }

        [Authorize()]
        [SwaggerOperation(Summary = "Xóa đơn thuốc")]
        [HttpDelete("{medicineId}")]
        public async Task<ApiResponse<bool>> DeleteMedicineByIdAsync(string medicineId)
        {
            return await _medicineService.DeleteMedicineByIdAsync(medicineId);
        }

        [Authorize()]
        [SwaggerOperation(Summary = "Cập nhật đơn thuốc")]
        [HttpPut("{medicineId}")]
        public async Task<ApiResponse<bool>> UpdateMedicineByIdAsync(string medicineId, UpdateMedicineDTO updateMedicineDTO)
        {
            return await _medicineService.UpdateMedicineByIdAsync(medicineId, updateMedicineDTO);
        }

        [Authorize()]
        [HttpGet("{medicineId}")]
        public async Task<ApiResponse<MedicineDTO>> GetMedicineByIdAsync(string medicineId)
        {
            return await _medicineService.GetMedicineByIdAsync(medicineId);
        }

    }
}
