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
import {
  GetAllCommentsDefaultQueryValues,
  getAllComments,
} from '../api/GetAllComments';
import { IComment } from '../models/Comment';

const HAS_MORE_DEFAULT_VALUE = true;

interface ICommentsContext {
  ObservedElement: FunctionComponent<{}>;
  comments: IComment[];
  userSpecificComments: IComment[];
  addNewComment: (text: string) => void;
  deleteComment: (commentId: number) => void;
}

const CommentsContext = createContext<ICommentsContext>({
  ObservedElement: {} as FunctionComponent<{}>,
  comments: [],
  userSpecificComments: [],
  addNewComment: () => {},
  deleteComment: () => {},
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
      createErrorNotification(
        'Something went wrong with loading the comments',
        { autoClose: false }
      );
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
        createSuccessNotification('Your comment was added successfully!');

        refetchAllComments();
      }
    } catch (err) {
      createErrorNotification('Something went wrong with adding your comment');
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await removeComment(commentId);

      if (!res.ok) {
        createErrorNotification("The comment you selected wasn't deleted");

        return;
      }

      createSuccessNotification('The comment was deleted successfully!');

      refetchAllComments();
    } catch (err) {
      createErrorNotification(
        'Something went wrong with deleting the selected comment'
      );
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
  };

  return (
    <CommentsContext.Provider value={context}>
      {props.children}
    </CommentsContext.Provider>
  );
};
