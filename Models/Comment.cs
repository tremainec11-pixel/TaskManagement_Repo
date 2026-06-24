namespace TaskManagement.API.Models;

public class Comment
{
    public int Id { get; set; }


    public string Text { get; set; } = string.Empty;


    public int TaskItemId { get; set; }


    public TaskItem? Task { get; set; }


    public int UserId { get; set; }


    public User? User { get; set; }


    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}