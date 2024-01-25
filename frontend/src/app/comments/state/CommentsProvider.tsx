'use client';

import { LoadingSpinner } from '@/app/contact/components/LoadingSpinner';
import { useNotifications } from '@/app/hooks/UseNotifications';
import { useSessionContext } from '@/app/session/state/UseSessionContext';
import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createComment } from '../api/CreateComment';
import { removeComment } from '../api/DeleteComment';
import { editCommentRequest } from '../api/EditComment';
import {
  GetAllCommentsDefaultQueryValues,
  getAllComments,
} from '../api/GetAllComments';
import { IComment } from '../models/Comment';

const HAS_MORE_DEFAULT_VALUE = true;

const NOTIFICATION_MESSAGES = {
  COMMENTS_LOAD_FAIL: 'Something went wrong with loading the comments',
  COMMENT_ADD_SUCCESS: 'Your comment was added successfully!',
  COMMENT_ADD_FAIL: 'Something went wrong with adding your comment',
  COMMENT_DELETE_SUCCESS: 'The comment was deleted successfully!',
  COMMENT_DELETE_FAIL: 'Something went wrong with deleting your comment',
  COMMENT_DELETE_ERROR: 'The comment was deleted successfully!',
  COMMENT_EDIT_SUCCESS: 'The comment was edited successfully!',
  COMMENT_EDIT_FAIL: 'Something went wrong with editing the selected comment',
};

interface ICommentsContext {
  ObservedElement: FunctionComponent<{}>;
  comments: IComment[];
  userSpecificComments: IComment[];
  addNewComment: (text: string) => void;
  deleteComment: (commentId: number) => void;
  editComment: (text: string, commentId: number) => void;
}

const CommentsContext = createContext<ICommentsContext>({
  ObservedElement: {} as FunctionComponent<{}>,
  comments: [],
  userSpecificComments: [],
  addNewComment: () => {},
  deleteComment: () => {},
  editComment: () => {},
});

export const useComments = () => useContext(CommentsContext);

interface Props {
  children: React.ReactNode;
}

export const CommentsProvider: React.FunctionComponent<Props> = (props) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const [hasMore, setHasMore] = useState<boolean>(HAS_MORE_DEFAULT_VALUE);

  const [pageNumber, setPageNumber] = useState<number>(
    GetAllCommentsDefaultQueryValues.DEFAULT_PAGE_NUMBER
  );

  const elementRef = useRef<HTMLDivElement>(null);

  const { user } = useSessionContext();

  const { createErrorNotification, createSuccessNotification } =
    useNotifications();

  const onIntersect = async (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];

    try {
      if (firstEntry.isIntersecting && hasMore) {
        const { result } = await getAllComments({ pageNumber });

        if (!result || result.length === 0) {
          setHasMore(false);
        } else {
          setComments((prevComments) => [...prevComments, ...result]);

          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      }
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.COMMENTS_LOAD_FAIL, {
        autoClose: false,
      });
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [comments]);

  const userSpecificComments = useMemo(() => {
    return comments.filter((c) => c.user.id === user?.id);
  }, [comments]);

  const addNewComment = async (text: string) => {
    if (!user?.id) {
      throw new Error(
        'Cannot add a new comment because the user id is missing'
      );
    }

    try {
      const res = await createComment({ text, userId: user.id });

      if (!res.errorMessages.length || res.result) {
        createSuccessNotification(NOTIFICATION_MESSAGES.COMMENT_ADD_SUCCESS);

        refetchAllComments();
      }
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.COMMENT_ADD_FAIL);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await removeComment(commentId);

      if (!res.ok) {
        createErrorNotification(NOTIFICATION_MESSAGES.COMMENT_DELETE_FAIL);

        return;
      }

      createSuccessNotification(NOTIFICATION_MESSAGES.COMMENT_DELETE_SUCCESS);

      refetchAllComments();
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.COMMENT_DELETE_ERROR);
    }
  };

  const editComment = async (text: string, commentId: number) => {
    try {
      const res = await editCommentRequest({
        id: commentId,
        text,
      });

      if (!res.ok) {
        createErrorNotification(NOTIFICATION_MESSAGES.COMMENT_EDIT_FAIL);

        return;
      }

      createSuccessNotification(NOTIFICATION_MESSAGES.COMMENT_EDIT_SUCCESS);

      refetchAllComments();
    } catch (err) {
      createErrorNotification(NOTIFICATION_MESSAGES.COMMENT_EDIT_FAIL);
    }
  };

  const refetchAllComments = () => {
    setComments([]);
    setHasMore(HAS_MORE_DEFAULT_VALUE);
    setPageNumber(GetAllCommentsDefaultQueryValues.DEFAULT_PAGE_NUMBER);
  };

  const ObservedElement: React.FunctionComponent = () => {
    return (
      <>
        {hasMore && (
          <div ref={elementRef}>
            <LoadingSpinner size={48} />
          </div>
        )}
      </>
    );
  };

  const context: ICommentsContext = {
    ObservedElement,
    comments,
    userSpecificComments,
    addNewComment,
    deleteComment,
    editComment,
  };

  return (
    <CommentsContext.Provider value={context}>
      {props.children}
    </CommentsContext.Provider>
  );
};
