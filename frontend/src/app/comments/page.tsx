'use client';
import { useNotifications } from '../hooks/UseNotifications';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';
import { generateId } from './utils/GenerateId';

export default function Comments() {
  const { comments, addNewComment, deleteComment } = useComments();

  const { createSuccessNotification } = useNotifications();

  const handleFormSubmit = (username: string, text: string) => {
    addNewComment({ text, username, date: new Date(), id: generateId() });

    createSuccessNotification('Comment successfully added!');
  };

  const handleCommentDelete = (commentId: string) => {
    deleteComment(commentId);

    createSuccessNotification('Comment successfully deleted!');
  };

  return (
    <section id='comments' className='max-w-3xl m-auto'>
      <Form onSubmit={handleFormSubmit} />

      <ul>
        {comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            deleteComment={() => handleCommentDelete(c.id)}
          />
        ))}
      </ul>
    </section>
  );
}
