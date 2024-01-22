'use client';

import { useSessionContext } from '@/app/session/state/UseSessionContext';
import { createContext, useContext, useState } from 'react';
import { IComment } from '../models/Comment';

interface ICommentsContext {
  comments: IComment[];
  addNewComment: (comment: IComment) => void;
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

  const addNewComment = async (comment: IComment) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text: comment.text,
        userId: user?.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(await res.json());

    setComments((prevState) => [...prevState, comment]);
  };

  const deleteComment = (commentId: string) => {
    setComments((prevState) => prevState.filter((c) => c.id !== commentId));
  };

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
