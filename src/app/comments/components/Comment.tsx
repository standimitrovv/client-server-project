'use client';

import Image from 'next/image';
import TimeAgo from 'react-timeago';
import img from '../../images/icon-p.png';
import { IComment } from '../models/Comment';

interface Props {
  comment: IComment;
  deleteComment: () => void;
}

export const Comment: React.FunctionComponent<Props> = ({
  comment,
  deleteComment,
}) => {
  return (
    <li className='mb-4 flex justify-between items-center'>
      <div className='flex'>
        <Image src={img} alt='profile-pic' width={60} />

        <div className='flex flex-col'>
          <div className='flex items-center'>
            <span className='font-semibold mr-2'>{`@${comment.username}`}</span>
            <TimeAgo
              date={comment.date}
              minPeriod={10}
              className='text-gray-200 text-sm'
            />
          </div>
          <div className='grid grid-cols-1'>
            <span className='text-ellipsis overflow-hidden whitespace-nowrap'>
              {comment.text}
            </span>
          </div>
        </div>
      </div>

      <span
        className='cursor-pointer p-2'
        title='Delete comment'
        onClick={deleteComment}
      >
        &#x2715;
      </span>
    </li>
  );
};
