using API.Dto;
using API.Models;

namespace API.Repository
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllCommentsAsync(int pageSize = 10, int pageNumber = 1);

        Task CreateCommentAsync(Comment comment);

        Task DeleteCommentAsync(Comment comment);

        Task<Comment> FindCommentByIdAsync(int id);
    }
}
