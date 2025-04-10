using AutoMapper;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Models.Entity;

namespace MedicineDoseTracker.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Medicine
            CreateMap<Medicine, MedicineDTO>();
            CreateMap<UpdateMedicineDTO, Medicine>();
            CreateMap<CreateMedicineDTO, Medicine>();
            #endregion

            #region Users
            CreateMap<Users, UserProfileDTO>();
            CreateMap<Users, UserMedicineInfoDTO>()
                .ForMember(dest => dest.Medicines,
                           opt => opt.MapFrom(src => src.Medicines.Where(m => !m.IsDeleted)));

            #endregion
        }
    }
}
