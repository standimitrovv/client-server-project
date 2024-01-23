'use client';

import { useNotifications } from '@/app/hooks/UseNotifications';
import { useSessionContext } from '@/app/session/state/UseSessionContext';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createComment } from '../api/CreateComment';
import { removeComment } from '../api/DeleteComment';
import { getAllComments } from '../api/GetAllComments';
import { IComment } from '../models/Comment';

const IS_PROCESSING_DEFAULT_VALUE = true;

interface ICommentsContext {
  comments: IComment[];
  isProcessing: boolean;
  addNewComment: (text: string) => void;
  deleteComment: (commentId: number) => void;
}

const CommentsContext = createContext<ICommentsContext>({
  comments: [],
  isProcessing: IS_PROCESSING_DEFAULT_VALUE,
  addNewComment: () => {},
  deleteComment: () => {},
});

export const useComments = () => useContext(CommentsContext);

interface Props {
  children: React.ReactNode;
}

export const CommentsProvider: React.FunctionComponent<Props> = (props) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const [isProcessing, setIsProcessing] = useState<boolean>(
    IS_PROCESSING_DEFAULT_VALUE
  );

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

      if (!res.errorMessages.length || res.result) {
        createSuccessNotification('Your comment was added successfully!');

        await fetchAndSetAllComments();
      }
    } catch (err) {
      createErrorNotification('Something went wrong with adding you comment');
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await removeComment(commentId);

      if (!res.ok) {
        createErrorNotification("The comment you selected wasn't deleted");

        return;
      }

      createSuccessNotification('The comment was successfully deleted!');

      await fetchAndSetAllComments();
    } catch (err) {
      createErrorNotification(
        'Something went wrong with deleting the selected comment'
      );
    }
  };

  const fetchAndSetAllComments = useCallback(async () => {
    setIsProcessing(true);
    try {
      const res = await getAllComments();

      if (!res.errorMessages.length || res.result) {
        setComments(res.result);
      }
    } catch (err) {
      createErrorNotification(
        'Something went wrong with fetching the comments'
      );
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Initial comments fetch
  useEffect(() => {
    (async () => {
      await fetchAndSetAllComments();
    })();
  }, []);

  const context: ICommentsContext = {
    comments,
    isProcessing,
    addNewComment,
    deleteComment,
  };

  return (
    <CommentsContext.Provider value={context}>
      {props.children}
    </CommentsContext.Provider>
  );
};
