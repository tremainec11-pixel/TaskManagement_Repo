using System.ComponentModel.DataAnnotations;

namespace TaskManagement.API.Models;

public class TaskItem
{
    public int Id { get; set; }


    [Required]
    public string Title { get; set; } = string.Empty;


    public string? Description { get; set; }


    public bool IsCompleted { get; set; } = false;


    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;



    // Project relationship

    public int ProjectId { get; set; }

    public Project? Project { get; set; }



    // User relationship

    public int AssignedToId { get; set; }

    public User? AssignedTo { get; set; }
}