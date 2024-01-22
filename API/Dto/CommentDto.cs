using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class CommentDto
    {
        [Required]
        public string Text { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
