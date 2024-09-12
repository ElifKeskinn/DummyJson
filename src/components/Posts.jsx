import { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import './styles/Posts.css';

export default function Posts({ setPage }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const getData = async (page, searchQuery = "", limit = 10) => {
    setLoading(true);
    const skip = (page - 1) * limit; 
    const url = searchQuery
      ? `https://dummyjson.com/posts/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(currentPage, searchTerm, itemsPerPage);
  }, [currentPage, searchTerm, itemsPerPage]); 

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1); 
      getData(1, searchTerm, itemsPerPage); 
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  return (
    <div className="posts-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="search-input"
        />
        <div className="items-per-page">
          Items per page: 
          <select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage} className="items-per-page-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <ul className="posts-list">
            {posts.length > 0 ? (
              posts.map(post => (
                <li key={post.id} className="post-item">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-body">{post.body}</p>
                  <button onClick={() => setPage(<PostDetail postId={post.id} setPage={setPage} />)} className="view-details-btn">
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <li className="no-posts">No posts found.</li>
            )}
          </ul>
          
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-btn">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1} className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
          </div>
        </>
      )}
    </div>
  );
}