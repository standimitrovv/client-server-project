using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
