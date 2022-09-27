import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

function RecipeCard({ type, recipe, index }) {
  return (
    <div className="card-container">
      <img
        src={ type === 'meal' ? recipe.strMealThumb : recipe.strDrinkThumb }
        alt={ type === 'meal' ? recipe.strMeal : recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <div className="name-container">
        <div
          className="name"
          data-testid={ `${index}-card-name` }
        >
          { type === 'meal' ? recipe.strMeal : recipe.strDrink }
        </div>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number,
  recipe: PropTypes.shape(),
}.isRequired;

export default RecipeCard;
