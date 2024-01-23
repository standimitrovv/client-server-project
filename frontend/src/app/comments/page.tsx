'use client';
import { useSessionContext } from '../session/state/UseSessionContext';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';

export default function Comments() {
  const { user } = useSessionContext();

  const { comments, addNewComment, deleteComment } = useComments();

  const handleFormSubmit = (text: string) => {
    addNewComment(text);
  };

  const handleCommentDelete = (commentId: number) => {
    deleteComment(commentId);
  };

  return (
    <section id='comments' className='max-w-3xl m-auto'>
      <Form onSubmit={handleFormSubmit} />

      <ul>
        {comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            deleteComment={
              c.user.id === user?.id
                ? () => handleCommentDelete(c.id)
                : undefined
            }
          />
        ))}
      </ul>
    </section>
  );
}
