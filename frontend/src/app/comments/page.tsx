'use client';
import { useState } from 'react';
import { useSessionContext } from '../session/state/UseSessionContext';
import { Comment } from './components/Comment';
import { CommentBeingEdited } from './components/CommentBeingEdited';
import { Form } from './components/Form';
import { useComments } from './state/CommentsProvider';

type Tab = 'All comments' | 'My comments';

interface Tabs {
  id: number;
  name: Tab;
}

const tabs: Tabs[] = [
  {
    id: 1,
    name: 'All comments',
  },
  {
    id: 2,
    name: 'My comments',
  },
];

export default function Comments() {
  const [activeTab, setActiveTab] = useState<Tab>('All comments');

  const [commentBeingEditedId, setCommentBeingEditedId] = useState<
    number | undefined
  >(undefined);

  const { user } = useSessionContext();

  const {
    ObservedElement,
    comments,
    userSpecificComments,
    addNewComment,
    deleteComment,
    editComment,
  } = useComments();

  const commentsToMap =
    activeTab === 'All comments' ? comments : userSpecificComments;

  const commentBeingEdited = commentsToMap.find(
    (c) => c.id === commentBeingEditedId
  );

  const handleFormSubmit = (text: string) => {
    addNewComment(text);
  };

  const handleCommentDelete = (commentId: number) => {
    deleteComment(commentId);
  };

  const handleSubmitEditedComment = (text: string, commentId: number) => {
    editComment(text, commentId);
    setCommentBeingEditedId(undefined);
  };

  return (
    <section id='comments' className='max-w-3xl m-auto'>
      <Form onSubmit={handleFormSubmit} />

      <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-6'>
        <ul className='flex flex-wrap -mb-px'>
          {tabs.map((t) => (
            <Tab
              key={t.id}
              text={t.name}
              isActive={t.name === activeTab}
              onClick={() => setActiveTab(t.name)}
            />
          ))}
        </ul>
      </div>

      <ul>
        {commentBeingEdited && (
          <CommentBeingEdited
            placeholder={commentBeingEdited.text}
            cancelEditing={() => setCommentBeingEditedId(undefined)}
            submitEditedComment={(text: string) =>
              handleSubmitEditedComment(text, commentBeingEdited.id)
            }
          />
        )}

        {commentsToMap
          .filter((c) => c.id !== commentBeingEditedId)
          .map((c) => (
            <Comment
              key={c.id}
              isOwnComment={c.user.id === user?.id}
              comment={c}
              deleteComment={() => handleCommentDelete(c.id)}
              isBeingEdited={!!commentBeingEditedId}
              setCommentBeingEditedId={() => setCommentBeingEditedId(c.id)}
            />
          ))}

        <ObservedElement />
      </ul>
    </section>
  );
}

const Tab: React.FunctionComponent<{
  text: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ text, isActive, onClick }) => {
  return (
    <li>
      <a
        className={`inline-block p-4 border-b-2 rounded-t-lg ${
          isActive
            ? ' text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500'
            : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer'
        } `}
        onClick={onClick}
      >
        {text}
      </a>
    </li>
  );
};
