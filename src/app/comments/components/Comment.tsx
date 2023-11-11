'use client';

import Image from 'next/image';
import img from '../../images/icon-p.png';
import { IComment } from '../models/Comment';

interface Props {
  comment: IComment;
}

export const Comment: React.FunctionComponent<Props> = ({ comment }) => {
  return (
    <div className='mb-4 flex'>
      <Image src={img} alt='profile-pic' width={80} className='rounded-full' />

      <div className='flex flex-col ml-2'>
        <div className='flex'>
          <span className='font-semibold mr-2'>{`@${comment.username}`}</span>
          <span>12 hours ago</span>
        </div>
        <span>{comment.text}</span>
      </div>
    </div>
  );
};
