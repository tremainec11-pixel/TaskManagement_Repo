using TaskManagement.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models;

namespace TaskManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProjectsController(ApplicationDbContext context)
    {
        _context = context;
    }


    // GET api/projects

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var projects = await _context.Projects
            .Include(p => p.CreatedBy)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                CreatedById = p.CreatedById,
                CreatedBy = p.CreatedBy!.Username,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();

        return Ok(projects);
    }



    // GET api/projects/1

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(int id)
    {
        var project = await _context.Projects
            .Include(p => p.CreatedBy)
            .FirstOrDefaultAsync(p => p.Id == id);


        if (project == null)
            return NotFound();


        return Ok(new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            CreatedById = project.CreatedById,
            CreatedBy = project.CreatedBy!.Username,
            CreatedAt = project.CreatedAt
        });
    }




    // POST api/projects

    [HttpPost]
    public async Task<IActionResult> CreateProject(CreateProjectDto dto)
    {
        var project = new Project
        {
            Name = dto.Name,
            Description = dto.Description,
            CreatedById = dto.CreatedById,
            CreatedAt = DateTime.UtcNow
        };


        _context.Projects.Add(project);

        await _context.SaveChangesAsync();


        var user = await _context.Users
            .FindAsync(project.CreatedById);


        return CreatedAtAction(
            nameof(GetProject),
            new { id = project.Id },
            new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                CreatedById = project.CreatedById,
                CreatedBy = user!.Username,
                CreatedAt = project.CreatedAt
            }
        );
    }





    // DELETE api/projects/1

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects
            .FindAsync(id);


        if (project == null)
            return NotFound();


        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();


        return NoContent();
    }
}