using API.Dto;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _db;

        public CommentRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<Comment>> GetAllCommentsAsync(int pageSize = 12, int pageNumber = 1)
        {
            const int MAX_PAGE_SIZE = 100;

            if(pageSize > MAX_PAGE_SIZE)
            {
                pageSize = MAX_PAGE_SIZE;
            }

            var comments = _db.Comments.Skip(pageSize * (pageNumber - 1)).Take(pageSize);

            return await comments.ToListAsync();
        }

        public async Task CreateCommentAsync(Comment comment)
        {
            await _db.Comments.AddAsync(comment);

            await SaveAsync();
        }

        public async Task DeleteCommentAsync(Comment comment)
        {
            _db.Comments.Remove(comment);

            await SaveAsync();
        }

        private async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public async Task<Comment> FindCommentByIdAsync(int id)
        {
            return await _db.Comments.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
