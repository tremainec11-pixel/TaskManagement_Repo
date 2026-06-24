using TaskManagement.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.Models;

namespace TaskManagement.API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;


    public UsersController(ApplicationDbContext context)
    {
        _context = context;
    }



    // GET: api/users
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users
    .Select(u => new UserDto
    {
        Id = u.Id,
        Username = u.Username,
        Email = u.Email,
        Role = u.Role,
        CreatedAt = u.CreatedAt
    })
    .ToListAsync();

return Ok(users);
    }

// PUT: api/users/1
[HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(int id, User user)
{
    if (id != user.Id)
        return BadRequest();

    var existingUser = await _context.Users.FindAsync(id);

    if (existingUser == null)
        return NotFound();

    existingUser.Username = user.Username;
    existingUser.Email = user.Email;
    existingUser.Role = user.Role;

    await _context.SaveChangesAsync();

    return NoContent();
}

    // GET: api/users/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users
            .FindAsync(id);


        if (user == null)
            return NotFound();


        return Ok(user);
    }



    // POST: api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();


        return CreatedAtAction(
            nameof(GetUser),
            new { id = user.Id },
            user
        );
    }



    // DELETE: api/users/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users
            .FindAsync(id);


        if(user == null)
            return NotFound();


        _context.Users.Remove(user);

        await _context.SaveChangesAsync();


        return NoContent();
    }
}