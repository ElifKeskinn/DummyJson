import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import './styles/Products.css';

export default function Products({ setPage }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchData = async (page, searchQuery = "") => {
    setLoading(true);
    const skip = (page - 1) * itemsPerPage;
    const url = searchQuery
      ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=${itemsPerPage}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

    try {
      const data = await fetch(url).then((res) => res.json());
      setProducts(data.products);
      setTotalProducts(data.total);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, itemsPerPage]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      fetchData(1, searchTerm);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  return (
    <div className="products-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />

      {loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <ul className="products-list">
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="product-item">
                  <img src={product.thumbnail} alt={product.title} className="product-image" />

                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <button 
                    className="view-details-button"
                    onClick={() => setPage(<ProductDetail productId={product.id} setPage={setPage} />)}
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <li className="no-products">No products found.</li>
            )}
          </ul>

          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i} 
                className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`} 
                onClick={() => setCurrentPage(i + 1)} 
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="pagination-button"
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          <div className="items-per-page">
            Items per page:
            <select 
              className="items-per-page-select" 
              onChange={(e) => setItemsPerPage(Number(e.target.value))} 
              value={itemsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}