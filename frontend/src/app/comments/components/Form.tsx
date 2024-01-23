'use client';

import { useState } from 'react';

interface Props {
  onSubmit: (comment: string) => void;
}

export const Form: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const [comment, setComment] = useState<string>('');

  const isSubmitButtonDisabled = !comment || !!comment.match('^\\s+$');

  const handleFormSubmit = () => {
    onSubmit(comment);

    setComment('');
  };

  return (
    <form className='flex flex-col mb-8' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='comment' className='mb-2'>
        Comment
      </label>
      <textarea
        required
        name='comment'
        id='comment'
        placeholder='What are your thoughts?'
        rows={4}
        cols={20}
        className='rounded-md mb-6 text-black p-2'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleFormSubmit}
        type='button'
        disabled={isSubmitButtonDisabled}
        className={`border rounded-md py-2 ${
          isSubmitButtonDisabled ? 'bg-gray-400 text-black' : 'bg-green-400'
        }`}
      >
        Add
      </button>
    </form>
  );
};
