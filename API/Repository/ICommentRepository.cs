using API.Dto;
using API.Models;

namespace API.Repository
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync();

        Task CreateCommentAsync(Comment comment);

        Task UpdateComment(Comment comment);

        Task DeleteCommentAsync(Comment comment);

        Task<Comment> FindCommentByIdAsync(int id);
    }
}
