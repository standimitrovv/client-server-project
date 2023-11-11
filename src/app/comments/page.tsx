'use client';
import { useState } from 'react';
import { Comment } from './components/Comment';
import { Form } from './components/Form';
import { IComment } from './models/Comment';

export default function Comments() {
  const [comments, setComments] = useState<IComment[]>([]);

  const handleFormSubmit = (username: string, text: string) => {
    const newComment = [{ text, username, date: new Date() }];

    setComments((prevState) => [...prevState, ...newComment]);
  };

  return (
    <div className='mt-4'>
      <Form onSubmit={handleFormSubmit} />

      {comments.map((c, index) => (
        <Comment key={`${c.text}${c.username}${index}`} comment={c} />
      ))}
    </div>
  );
}
