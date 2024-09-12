import { useContext } from 'react';
import { CommentContext } from './CommentContext';

export default function CommentList() {
  const { comments, likeComment } = useContext(CommentContext);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <button onClick={() => likeComment(comment.id)}>
            Like {comment.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
