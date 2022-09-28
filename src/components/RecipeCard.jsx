import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

function RecipeCard({ type, recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-container"
    >
      <Link
        className="link"
        to={ type === 'meal' ? `/meals/${recipe.idMeal}`
          : `/drinks/${recipe.idDrink}` }
      >
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
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  type: PropTypes.string,
  index: PropTypes.number,
  recipe: PropTypes.shape(),
}.isRequired;

export default RecipeCard;
