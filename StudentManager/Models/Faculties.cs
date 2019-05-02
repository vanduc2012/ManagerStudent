using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManager.Models
{
    public class Faculties
    {
        [Required]
        [Key]
        public int Id { get; set; }


        [Required]
        [StringLength(50), MinLength(1)]
        public string DisplayName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please type name")]
        [StringLength(50), MinLength(1)]
        public string Name { get; set; }

        public string Address { get; set; }
    }
}
