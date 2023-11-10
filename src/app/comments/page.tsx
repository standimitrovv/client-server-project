'use client';
import { useState } from 'react';

interface Comment {
  username: string;
  text: string;
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleFormSubmit = () => {
    const newComment = [{ text: 'abss', username: 'Miro' }];

    setComments((prevState) => [...prevState, ...newComment]);
  };

  return (
    <div className='mt-4'>
      <form className='flex flex-col'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          className='mb-4 rounded-md text-black p-2'
        />

        <label htmlFor='comment'>Comment</label>
        <textarea
          name='comment'
          id='comment'
          placeholder='What are your thoughts?'
          rows={4}
          cols={20}
          className='rounded-md mb-4 text-black p-2'
        />

        <button onClick={handleFormSubmit}>Add</button>
      </form>

      {comments.map((c, index) => (
        <div key={`${c.text}${c.username}${index}`}>
          {/* <Image /> */}
          <div className='flex flex-col'>
            <div className='flex'>
              <span className='font-semibold'>{`@${c.username}`}</span>
              <span>12 hours ago</span>
            </div>
            <span>{c.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
