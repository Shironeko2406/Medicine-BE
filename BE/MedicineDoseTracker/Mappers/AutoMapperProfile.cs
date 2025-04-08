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
            #endregion

            #region Users
            CreateMap<Users, UserProfileDTO>();
            #endregion
        }
    }
}
