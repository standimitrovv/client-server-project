'use client';

import Image from 'next/image';
import img from '../../images/icon-p.png';
import { IComment } from '../models/Comment';

interface Props {
  comment: IComment;
  isOwnComment: boolean;
  isBeingEdited: boolean;
  setCommentBeingEditedId: () => void;
  deleteComment: () => void;
}

export const Comment: React.FunctionComponent<Props> = ({
  comment,
  isOwnComment,
  deleteComment,
  isBeingEdited,
  setCommentBeingEditedId,
}) => {
  const handleEditCommentClick = () => {
    window.scrollTo(0, 0);

    setCommentBeingEditedId();
  };

  return (
    <li className='mb-4 flex justify-between items-center'>
      <div className='flex'>
        <Image src={img} alt='profile-pic' width={60} />

        <div className='flex flex-col'>
          <div className='flex items-center'>
            <span className='font-semibold mr-2'>
              {isOwnComment ? 'You' : `@${comment.user.userName}`}
            </span>
          </div>
          <div className='grid grid-cols-1'>
            <span className='text-ellipsis overflow-hidden whitespace-nowrap'>
              {comment.text}
            </span>
          </div>
        </div>
      </div>

      {!isBeingEdited && isOwnComment && (
        <div className='flex items-center gap-3'>
          <span
            className='cursor-pointer'
            onClick={handleEditCommentClick}
            title='Edit'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-pencil'
              viewBox='0 0 16 16'
            >
              {' '}
              <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />{' '}
            </svg>
          </span>

          <span
            className='cursor-pointer p-2'
            title='Delete comment'
            onClick={deleteComment}
          >
            &#x2715;
          </span>
        </div>
      )}
    </li>
  );
};
