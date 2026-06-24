namespace TaskManagement.API.DTOs;

public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;


    public string? Description { get; set; }


    public int ProjectId { get; set; }


    public int AssignedToId { get; set; }
}