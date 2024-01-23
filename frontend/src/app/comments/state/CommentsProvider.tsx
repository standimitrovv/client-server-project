'use client';

import { useNotifications } from '@/app/hooks/UseNotifications';
import { useSessionContext } from '@/app/session/state/UseSessionContext';
import { createContext, useContext, useEffect, useState } from 'react';
import { createComment } from '../api/CreateComment';
import { getAllComments } from '../api/GetAllComments';
import { IComment } from '../models/Comment';

interface ICommentsContext {
  comments: IComment[];
  addNewComment: (text: string) => void;
  deleteComment: (commentId: string) => void;
}

const CommentsContext = createContext<ICommentsContext>({
  comments: [],
  addNewComment: () => {},
  deleteComment: () => {},
});

export const useComments = () => useContext(CommentsContext);

interface Props {
  children: React.ReactNode;
}

export const CommentsProvider: React.FunctionComponent<Props> = (props) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const { user } = useSessionContext();

  const { createErrorNotification, createSuccessNotification } =
    useNotifications();

  const addNewComment = async (text: string) => {
    if (!user?.id) {
      throw new Error(
        'Cannot add a new comment because the user id is missing'
      );
    }

    try {
      const res = await createComment({ text, userId: user.id });
    } catch (err) {}
  };

  const deleteComment = (commentId: string) => {
    // setComments((prevState) => prevState.filter((c) => c.id !== commentId));
  };

  // Initial comments fetch
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllComments();

        if (res.result) {
          setComments(res.result);
        }
      } catch (err) {
        createErrorNotification(
          'Something went wrong with fetching the comments'
        );
      }
    })();
  }, []);

  const context = {
    comments,
    addNewComment,
    deleteComment,
  };

  return (
    <CommentsContext.Provider value={context}>
      {props.children}
    </CommentsContext.Provider>
  );
};
