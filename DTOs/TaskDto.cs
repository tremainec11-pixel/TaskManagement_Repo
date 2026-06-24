namespace TaskManagement.API.DTOs;

public class TaskDto
{
    public int Id { get; set; }


    public string Title { get; set; } = string.Empty;


    public string? Description { get; set; }


    public bool IsCompleted { get; set; }


    public int ProjectId { get; set; }


    public string? ProjectName { get; set; }


    public int AssignedToId { get; set; }


    public string? AssignedTo { get; set; }


    public DateTime CreatedAt { get; set; }
}