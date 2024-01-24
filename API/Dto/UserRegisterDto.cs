using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "The Username field cannot be blank")]
        [MinLength(2, ErrorMessage = "Please, make sure the username is at least 2 characters long")]
        public string Username { get; set; }

        [Required(ErrorMessage = "The Email field cannot be blank")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password field cannot be blank")]
        public string Password { get; set; }
    }
}
