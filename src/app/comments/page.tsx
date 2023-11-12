'use client';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';

export default function Comments() {
  const { comments, addNewComment } = useComments();

  const handleFormSubmit = (username: string, text: string) => {
    addNewComment({ text, username, date: new Date() });
  };

  return (
    <div className='mt-4'>
      <Form onSubmit={handleFormSubmit} />

      <ul>
        {comments.map((c, index) => (
          <Comment key={`${c.text}${c.username}${index}`} comment={c} />
        ))}
      </ul>
    </div>
  );
}
