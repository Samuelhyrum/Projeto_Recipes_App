import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import RecipeCard from './RecipeCard';
import './Content.css';

const MAX_RECIPES = 11;
function Content({ title }) {
  const { content: recipes } = useContext(AppContext);
  return (
    <div className="cards">
      {recipes.map((recipe, index) => {
        if (index <= MAX_RECIPES) {
          return (
            title === 'meals'
              ? (
                <RecipeCard
                  key={ recipe.idMeal }
                  type="meal"
                  recipe={ recipe }
                  index={ index }
                  data-testid={ `${index}-recipe-card` }
                />)
              : (
                <RecipeCard
                  key={ recipe.idDrink }
                  type="drink"
                  recipe={ recipe }
                  index={ index }
                  data-testid={ `${index}-recipe-card` }
                />)
          );
        }
        return null;
      })}
    </div>
  );
}

Content.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Content;
