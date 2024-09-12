import { createContext, useState, useEffect } from 'react';

export const CommentContext = createContext(null);

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);
  }, []);

  const addComment = (newComment) => {
    setComments((prev) => {
      const updatedComments = [...prev, newComment];
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      return updatedComments;
    });
  };

  const likeComment = (commentId) => {
    setComments((prev) => {
      const updatedComments = prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      );
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      return updatedComments;
    });
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, likeComment }}>
      {children}
    </CommentContext.Provider>
  );
}
