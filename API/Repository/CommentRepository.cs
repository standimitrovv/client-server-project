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

        public async Task CreateCommentAsync(Comment comment)
        {
            await _db.Comments.AddAsync(comment);
             
            await SaveAsync();
        }

        public async Task UpdateComment(Comment comment)
        {
            _db.Comments.Update(comment);

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
