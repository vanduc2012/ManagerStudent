﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManager.Models;

namespace StudentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly StudentManagerContext _context;

        public ClassesController(StudentManagerContext context)
        {
            _context = context;
        }

        // GET: api/Classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classes>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        // GET: api/Classes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Classes>> GetClasses(int id)
        {
            var classes = await _context.Classes.FindAsync(id);

            if (classes == null)
            {
                return NotFound();
            }

            return classes;
        }

        // PUT: api/Classes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClasses(int id, Classes classes)
        {
            if (id != classes.Id)
            {
                return BadRequest();
            }

            _context.Entry(classes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Classes
        [HttpPost]
        public async Task<ActionResult<Classes>> PostClasses(Classes classes)
        {
            _context.Classes.Add(classes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClasses", new { id = classes.Id }, classes);
        }

        // DELETE: api/Classes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Classes>> DeleteClasses(int id)
        {
            var classes = await _context.Classes.FindAsync(id);
            if (classes == null)
            {
                return NotFound();
            }

            _context.Classes.Remove(classes);
            await _context.SaveChangesAsync();

            return classes;
        }

        private bool ClassesExists(int id)
        {
            return _context.Classes.Any(e => e.Id == id);
        }
    }
}
