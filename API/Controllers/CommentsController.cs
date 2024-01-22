using API.Dto;
using API.Models;
using API.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public CommentsController(ICommentRepository commentRepository, IMapper mapper) 
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<Comment>> GetAllComments()
        {
            var comments = await _commentRepository.GetAllCommentsAsync();

            return comments;
        }

        [HttpPost]
        public async Task CreateComment([FromBody] CommentDto commentDto)
        {
            var comment = new Comment()
            {
                CreatedDate = DateTime.Now,
                Text = commentDto.Text,
                UserId = commentDto.UserId,
                UpdatedDate = DateTime.Now
            };

            //var comment = _mapper.Map<Comment>(commentDto);

            await _commentRepository.CreateCommentAsync(comment);
        }
    }
}
