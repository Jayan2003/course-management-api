using CourseManagementApi.DTOs;

namespace CourseManagementApi.Interfaces;

public interface IInstructorService
{
    Task<List<InstructorResponseDto>> GetAllAsync();
    Task<InstructorResponseDto> CreateAsync(CreateInstructorDto dto);
    Task<InstructorResponseDto?> UpdateAsync(int id, UpdateInstructorDto dto);
    Task<bool> DeleteAsync(int id);
}