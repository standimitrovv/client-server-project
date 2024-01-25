using API.Dto;
using API.Dto.DtoResponse;
using API.Models;
using API.Repository;
using API.Repository.User;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;
        private readonly APIResponse<CommentDtoResponse> _apiRes;
        private readonly IMapper _mapper;

        public CommentsController(ICommentRepository commentRepository, IUserRepository userRepository, IMapper mapper) 
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _apiRes = new();
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<APIResponse<List<CommentDtoResponse>>> GetAllComments([FromQuery] int pageSize = 12, [FromQuery] int pageNumber = 1)
        {
            var _apiListResponse = new APIResponse<List<CommentDtoResponse>>();

            var commentsResponseList = new List<CommentDtoResponse>();

            try
            {
                var comments = await _commentRepository.GetAllCommentsAsync(pageSize, pageNumber);

                if(comments.Count == 0 || comments == null)
                {
                    _apiListResponse.StatusCode = HttpStatusCode.OK;
                    _apiListResponse.Result = commentsResponseList;
                    return _apiListResponse;
                }

                var sortedByCreatedDate = comments.OrderByDescending(c => c.CreatedDate).ToList();

                foreach (var comment in sortedByCreatedDate)
                {
                    var user = await _userRepository.FindUserById(comment.UserId);

                    var c = new CommentDtoResponse()
                    {
                        Id = comment.Id,
                        Text = comment.Text,
                        User = user
                    };

                    commentsResponseList.Add(c);
                }

                _apiListResponse.StatusCode = HttpStatusCode.OK;
                _apiListResponse.Result = commentsResponseList;
                return _apiListResponse;

            } catch (Exception ex)
            {
                _apiListResponse.ErrorMessages.Add(ex.Message);
                _apiListResponse.StatusCode = HttpStatusCode.BadGateway;
            }


            return _apiListResponse;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status502BadGateway)]
        public async Task<APIResponse<CommentDtoResponse>> CreateComment([FromBody] CommentDto commentDto)
        {
            var existingUser = await _userRepository.FindUserById(commentDto.UserId);

            if (string.IsNullOrWhiteSpace(commentDto.UserId) || existingUser == null)
            {
                _apiRes.ErrorMessages = new List<string>() { "No user with the provided id was found" };
                _apiRes.StatusCode = HttpStatusCode.NotFound;

                return _apiRes;
            }

            var comment = _mapper.Map<Comment>(commentDto);

            try
            { 
                await _commentRepository.CreateCommentAsync(comment);
            } catch (Exception ex)
            {
                _apiRes.ErrorMessages.Add(ex.Message);
                _apiRes.StatusCode = HttpStatusCode.BadGateway;
                return _apiRes;
            }

            var commentResponse = new CommentDtoResponse()
            {
                Id = comment.Id,
                Text = commentDto.Text,
                User = existingUser
            };

            _apiRes.StatusCode = HttpStatusCode.OK;
            _apiRes.Result = commentResponse;

            return _apiRes;
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> UpdateComment([FromBody] UpdateCommentDto commentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepository.FindCommentByIdAsync(commentDto.Id);

            if(comment == null)
            {
                ModelState.AddModelError("Comment", "A comment with the provided Id was not found");
                return BadRequest(ModelState);
            }

            comment.UpdatedDate = DateTime.Now;
            comment.Text = commentDto.Text;

            try
            {
                await _commentRepository.UpdateComment(comment);
            } catch (Exception ex)
            {
                ModelState.AddModelError("Exception", ex.Message);
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpDelete("{commentId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteComment(int commentId)
        {
            if(commentId <= 0)
            {
                return BadRequest();
            }

            try
            {
                var comment = await _commentRepository.FindCommentByIdAsync(commentId);

                if(comment == null)
                {
                    return NotFound();
                }

                await _commentRepository.DeleteCommentAsync(comment);

                return Ok();
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
