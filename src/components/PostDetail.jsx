import { useEffect, useState, useContext } from "react";
import Posts from "./Posts";
import './styles/PostDetail.css';
import { FaThumbsUp, FaThumbsDown, FaEye } from 'react-icons/fa'; 
import CommentForm from './CommentForm';
import { CommentContext } from './CommentContext';

export default function PostDetail({ postId, setPage }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { comments: localComments, addComment, likeComment } = useContext(CommentContext);
  const [commentLikes, setCommentLikes] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data));

    fetch(`https://dummyjson.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data.comments));
  }, [postId]);

  const handleAddComment = (username, text) => {
    const newComment = {
      id: crypto.randomUUID(),
      user: { username },
      body: text,
      likes: 0,
      postId
    };
    addComment(newComment);
  };

  const handleLikeClick = (commentId) => {
    setCommentLikes(prevLikes => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1
    }));
    likeComment(commentId);  
  };

  if (!post) return <p>Loading...</p>;

  const filteredLocalComments = localComments.filter(comment => comment.postId === postId);

  return (
    <div className="post-detail-container">
      <a href="#" className="back-link" onClick={() => setPage(<Posts setPage={setPage} />)}>◀ Back to Posts</a>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <p className="post-tags">
        {post.tags.map(tag => `#${tag}`).join(" , ")}
      </p>
      <p className="post-views">
        <FaEye className="view-icon" />  &nbsp; {post.views}
      </p>
      <div className="post-reactions">
        <FaThumbsUp className="reaction-icon" />
        <span className="reaction-count">{post.reactions.likes}&nbsp; &nbsp;</span>
        <FaThumbsDown className="reaction-icon" />
        <span className="reaction-count">{post.reactions.dislikes}</span>
      </div>
      <hr />
      <div className="comments-container">
        <h3>Comments ({comments.length + filteredLocalComments.length})</h3>
        <ul>
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <span className="comment-username">{comment.user.username} </span>
              <span className="comment-body"> &nbsp; {comment.body} &nbsp; </span>
              <div className="reaction">
                <FaThumbsUp className="reaction-icon" />
                <span className="comment-likes">{comment.likes}</span>
              </div>
            </div>
          ))}
          {filteredLocalComments.map(comment => (
            <div key={comment.id} className="comment-item">
              <span className="comment-username">{comment.user.username} </span>
              <span className="comment-body"> &nbsp; {comment.body} &nbsp; </span>
              <div className="reaction">
                <button
                  onClick={() => handleLikeClick(comment.id)}
                  style={{
                    backgroundColor: '#2a2a2a',
                    border: 'none',
                    cursor: 'pointer',
                    verticalAlign: 'bottom'
                  }}
                >
                  <FaThumbsUp
                    style={{
                      color: '#666',
                      fontSize: '1.3rem'
                    }}
                  />
                </button>

                <span className="comment-likes">{commentLikes[comment.id] || 0}</span>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
}
