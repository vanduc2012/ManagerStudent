using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudentManager.Models;

namespace StudentManager.Models
{
    public class StudentManagerContext : DbContext
    {
        public StudentManagerContext (DbContextOptions<StudentManagerContext> options)
            : base(options)
        {
        }

        public DbSet<StudentManager.Models.Faculties> Faculties { get; set; }

        public DbSet<StudentManager.Models.Classes> Classes { get; set; }

        public DbSet<StudentManager.Models.Students> Students { get; set; }
    }
}
