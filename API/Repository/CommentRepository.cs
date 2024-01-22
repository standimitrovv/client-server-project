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

        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _db.Comments.ToListAsync();
        }

        public async Task<Comment> GetCommentAsync(int id)
        {
            return await FindCommentById(id);
        }
        public async Task CreateCommentAsync(Comment comment)
        {
            await _db.Comments.AddAsync(comment);

            await SaveAsync();
        }

        public async Task DeleteCommentAsync(int id)
        {
            var comment = await FindCommentById(id);

            _db.Comments.Remove(comment);

            await SaveAsync();
        }

        private async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        private async Task<Comment> FindCommentById(int id)
        {
            return await _db.Comments.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
