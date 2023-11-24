'use client';
import { useNotifications } from '../hooks/UseNotifications';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';
import { generateId } from './utils/GenerateId';

export default function Comments() {
  const { comments, addNewComment } = useComments();

  const { createSuccessNotification } = useNotifications();

  const handleFormSubmit = (username: string, text: string) => {
    addNewComment({ text, username, date: new Date(), id: generateId() });

    createSuccessNotification('Comment successfully added!');
  };

  return (
    <section id='comments' className='max-w-3xl m-auto'>
      <Form onSubmit={handleFormSubmit} />

      <ul>
        {comments.map((c, index) => (
          <Comment key={`${c.text}${c.username}${index}`} comment={c} />
        ))}
      </ul>
    </section>
  );
}
