'use client';

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

  const addNewComment = (comment: IComment) => {
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
