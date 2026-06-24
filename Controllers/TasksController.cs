using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;


namespace TaskManagement.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{

    private readonly ApplicationDbContext _context;


    public TasksController(ApplicationDbContext context)
    {
        _context = context;
    }



    // GET api/tasks

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var tasks = await _context.Tasks
            .Include(t => t.Project)
            .Include(t => t.AssignedTo)
            .Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,

                ProjectId = t.ProjectId,
                ProjectName = t.Project!.Name,

                AssignedToId = t.AssignedToId,
                AssignedTo = t.AssignedTo!.Username,

                CreatedAt = t.CreatedAt
            })
            .ToListAsync();


        return Ok(tasks);
    }


    // GET api/tasks/1

[HttpGet("{id}")]
public async Task<IActionResult> GetTask(int id)
{
    var task = await _context.Tasks
        .Include(t => t.Project)
        .Include(t => t.AssignedTo)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (task == null)
        return NotFound();

    return Ok(new TaskDto
    {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        IsCompleted = task.IsCompleted,

        ProjectId = task.ProjectId,
        ProjectName = task.Project?.Name,

        AssignedToId = task.AssignedToId,
        AssignedTo = task.AssignedTo?.Username,

        CreatedAt = task.CreatedAt
    });
}

// PUT api/tasks/1

[HttpPut("{id}")]
public async Task<IActionResult> UpdateTask(int id, CreateTaskDto dto)
{
    var task = await _context.Tasks.FindAsync(id);

    if (task == null)
        return NotFound();

    task.Title = dto.Title;
    task.Description = dto.Description;
    task.ProjectId = dto.ProjectId;
    task.AssignedToId = dto.AssignedToId;

    await _context.SaveChangesAsync();

    return NoContent();
}

// DELETE api/tasks/1

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTask(int id)
{
    var task = await _context.Tasks.FindAsync(id);

    if (task == null)
        return NotFound();

    _context.Tasks.Remove(task);

    await _context.SaveChangesAsync();

    return NoContent();
}

    // POST api/tasks

    [HttpPost]
    public async Task<IActionResult> CreateTask(CreateTaskDto dto)
    {

        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,

            ProjectId = dto.ProjectId,
            AssignedToId = dto.AssignedToId,

            CreatedAt = DateTime.UtcNow
        };


        _context.Tasks.Add(task);

        await _context.SaveChangesAsync();


        return CreatedAtAction(
    nameof(GetTask),
    new { id = task.Id },
    task
);
    }

}