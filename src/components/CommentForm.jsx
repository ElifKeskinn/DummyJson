import { useState } from 'react';
import './styles/CommentForm.css';

export default function CommentForm({ onAddComment }) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && text.trim()) {
      onAddComment(username, text);
      setUsername('');
      setText('');
    }
  };

  return (
    <div className="comment-form-container">
    <h3 className="comment-form-title">Add a Comment</h3>
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="comment-form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      <button
        type="submit"
        className="comment-form-button"
        disabled={!username || !text}
      >
        Add Comment
      </button>
    </form>
  </div>
);
}