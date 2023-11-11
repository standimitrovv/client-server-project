'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (username: string, comment: string) => void;
}

export const Form: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');

  const [comment, setComment] = useState<string>('');

  const handleFormSubmit = () => {
    onSubmit(username, comment);
  };

  return (
    <form className='flex flex-col mb-2' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        name='username'
        className='mb-4 rounded-md text-black p-2'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor='comment'>Comment</label>
      <textarea
        name='comment'
        id='comment'
        placeholder='What are your thoughts?'
        rows={4}
        cols={20}
        className='rounded-md mb-4 text-black p-2'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleFormSubmit}
        type='submit'
        disabled={!username || !comment}
      >
        Add
      </button>
    </form>
  );
};
