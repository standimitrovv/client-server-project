using API.Dto;
using API.Models;

namespace API.Repository
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync();

        Task<Comment> GetCommentAsync(int id);

        Task CreateCommentAsync(Comment comment);

        Task DeleteCommentAsync(int id);
    }
}
