using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManager.Models
{
    public class Classes
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [StringLength(50), MinLength(1)]
        public string DisplayName { get; set; }

       
        [StringLength(50), MinLength(1)]
        public string Name { get; set; }

        [Required]
        public int IdFaculty { get; set; }
        public virtual Faculties Faculty { get; set; }

    }
}
