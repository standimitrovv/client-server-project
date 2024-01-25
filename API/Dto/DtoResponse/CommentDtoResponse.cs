namespace API.Dto.DtoResponse
{
    public class CommentDtoResponse
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedDate { get; set; }

        public UserDto User { get; set; }
    }
}
