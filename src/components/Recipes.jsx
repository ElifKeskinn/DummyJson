import { useEffect, useState } from "react";
import RecipeDetail from "./RecipeDetail";
import './styles/Recipes.css';


export default function Recipes({ setPage }) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const url = `https://dummyjson.com/recipes`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);
      setRecipes(data.recipes);
      setTotalPages(Math.ceil(data.recipes.length / itemsPerPage)); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchData();
}, []);

useEffect(() => {
  console.log("Filtering recipes due to searchTerm change");

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Recipes:", filteredRecipes);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  setDisplayedRecipes(filteredRecipes.slice(startIndex, endIndex));
  setTotalPages(Math.ceil(filteredRecipes.length / itemsPerPage));
}, [searchTerm, recipes, currentPage, itemsPerPage]);



const handleSearchKeyDown = (e) => {
  if (e.key === 'Enter') {
    setCurrentPage(1);
    fetchData(searchTerm); 
  }
};


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  return (
    <div className="recipes-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />

      {loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <>
          <ul className="recipes-list">
          {displayedRecipes.length > 0 ? (
              displayedRecipes.map(recipe => (
                <div key={recipe.id} className="recipe-item">
                  <img src={recipe.image} alt={recipe.name} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
                  <div className="recipe-details">
                    <div><strong>Difficulty:</strong> {recipe.difficulty}</div>
                    <div><strong>Cuisine:</strong> {recipe.cuisine}</div>
                    <div><strong>Rating:</strong> {recipe.rating} / 5</div>
                  </div>
                  <button
                    className="view-details-button"
                    onClick={() => setPage(<RecipeDetail recipeId={recipe.id} setPage={setPage} />)}
                  >
                    {recipe.name}
                  </button>
                </div>
              ))
            ) : (
              <li className="no-recipes">No recipes found.</li>
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