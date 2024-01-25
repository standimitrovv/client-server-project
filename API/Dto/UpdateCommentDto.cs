using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class UpdateCommentDto
    {
        [Required(ErrorMessage = "The Id of the comment cannot be blank")]
        public int Id { get; set; }

        [Required(ErrorMessage = "The Text field cannot be blank")]
        public string Text { get; set; }
    }
}
