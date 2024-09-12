import { createContext, useState } from 'react';

export const CommentContext = createContext(null);

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const likeComment = (commentId) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, likeComment }}>
      {children}
    </CommentContext.Provider>
  );
}
