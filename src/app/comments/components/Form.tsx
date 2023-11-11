'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (username: string, comment: string) => void;
}

export const Form: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState<string>('');

  const [comment, setComment] = useState<string>('');

  const isSubmitButtonDisabled = !username || !comment;

  const handleFormSubmit = () => {
    onSubmit(username, comment);

    setUsername('');

    setComment('');
  };

  return (
    <form className='flex flex-col mb-8' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='What is your username?'
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
        type='button'
        disabled={isSubmitButtonDisabled}
        className={`border rounded-md py-2 ${
          isSubmitButtonDisabled ? 'bg-gray-400 text-black' : 'bg-green-300'
        }`}
      >
        Add
      </button>
    </form>
  );
};
