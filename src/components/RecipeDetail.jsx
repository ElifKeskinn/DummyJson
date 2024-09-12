import { useEffect, useState } from "react";
import Recipes from "./Recipes";
import './styles/RecipeDetail.css';

export default function RecipeDetail({ recipeId, setPage }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data));
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail-container">
      <a href="#" className="back-link" onClick={() => setPage(<Recipes setPage={setPage} />)}>◀ Back to Recipes</a>
      <h3 className="recipe-name">{recipe.name}</h3>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <div className="recipe-details">
        <p><strong>Preparation Time: </strong> {recipe.prepTimeMinutes} minutes</p>
        <p><strong>Cooking Time: </strong> {recipe.cookTimeMinutes} minutes</p>
        <p><strong>Servings: </strong> {recipe.servings}</p>
        <p><strong>Calories per Serving: </strong> {recipe.caloriesPerServing}</p>
        <p><strong>Reviews: </strong> {recipe.reviewCount}</p>
        <p><strong>Meal Type: </strong> {recipe.mealType.join(", ")}</p>
      </div>
      <div className="recipe-ingredients">
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h4>Instructions:</h4>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
      <div className="recipe-tags"> {recipe.tags.map(tag => `#${tag}`).join(" , ")}</div>
    </div>
  );
}
