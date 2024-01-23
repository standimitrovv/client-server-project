'use client';
import { useNotifications } from '../hooks/UseNotifications';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';

export default function Comments() {
  const { comments, addNewComment, deleteComment } = useComments();

  const { createSuccessNotification } = useNotifications();

  const handleFormSubmit = (text: string) => {
    addNewComment(text);
  };

  const handleCommentDelete = (commentId: string) => {
    deleteComment(commentId);

    createSuccessNotification('Comment successfully deleted!');
  };

  return (
    <section id='comments' className='max-w-3xl m-auto'>
      <Form onSubmit={handleFormSubmit} />

      <ul>
        {comments.map((c, index) => (
          <Comment
            key={`${c.text}-${index}`}
            comment={c}
            deleteComment={() => {}}
          />
        ))}
      </ul>
    </section>
  );
}
