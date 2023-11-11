'use client';

import { IComment } from '../models/Comment';

interface Props {
  comment: IComment;
}

export const Comment: React.FunctionComponent<Props> = ({ comment }) => {
  return (
    <div className='mb-4'>
      {/* <Image /> */}
      <div className='flex flex-col'>
        <div className='flex'>
          <span className='font-semibold mr-2'>{`@${comment.username}`}</span>
          <span>12 hours ago</span>
        </div>
        <span>{comment.text}</span>
      </div>
    </div>
  );
};
