namespace TaskManagement.API.DTOs;


public class ProjectDto
{
    public int Id { get; set; }


    public string Name { get; set; } = string.Empty;


    public string Description { get; set; } = string.Empty;


    public int CreatedById { get; set; }


    public string CreatedBy { get; set; } = string.Empty;


    public DateTime CreatedAt { get; set; }
}