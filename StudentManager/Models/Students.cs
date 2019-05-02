using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManager.Models
{
    public class Students
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(8, ErrorMessage = "please insert full codeview")]

        public string CodeView { get; set; }

        [StringLength(50), MinLength(5, ErrorMessage ="minlength of nam is 5 char.")]
        public string Name { get; set; }

        public string Address { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirtd { get; set; }
        public string Phone { get; set; }

        [Required]
        public int IdClasses { get; set; }
        public virtual Classes Classes { get; set; }
    }
}
