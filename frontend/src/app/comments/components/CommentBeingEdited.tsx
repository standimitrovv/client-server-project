'use client';
import Image from 'next/image';
import { useState } from 'react';
import img from '../../images/icon-p.png';

interface Props {
  placeholder: string;
  cancelEditing: () => void;
  submitEditedComment: (text: string) => void;
}

export const CommentBeingEdited: React.FunctionComponent<Props> = ({
  placeholder,
  cancelEditing,
  submitEditedComment,
}) => {
  const [text, setText] = useState<string>('');

  const isSubmitDisabled = placeholder === text || !text.trim().length;

  const handleSubmitEditedComment = () => {
    if (isSubmitDisabled) {
      return;
    }

    submitEditedComment(text);
  };

  return (
    <li className='mb-4 flex justify-between items-center'>
      <div className='flex'>
        <Image src={img} alt='profile-pic' width={60} />

        <div className='flex flex-col'>
          <div className='flex items-center'>
            <span className='font-semibold mr-2'>You</span>
          </div>
          <input
            className='h-6 outline-blue-500 p-2 rounded-md text-black'
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <span
          className='cursor-pointer p-2'
          title='Cancel editing'
          onClick={cancelEditing}
        >
          &#x2715;
        </span>
        <span
          className={`p-2 rounded-md bg-blue-700 ${
            isSubmitDisabled
              ? 'pointer-events-none bg-gray-400'
              : 'cursor-pointer'
          }`}
          title='Submit'
          onClick={handleSubmitEditedComment}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            viewBox='0 0 24 24'
            id='send'
          >
            <path fill='none' d='M0 0h24v24H0V0z'></path>
            <path d='M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z'></path>
          </svg>
        </span>
      </div>
    </li>
  );
};
