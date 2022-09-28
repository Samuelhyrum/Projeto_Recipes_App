import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import RecipeCard from './RecipeCard';
import './Content.css';

const MAX_RECIPES = 11; // Máximos de receitas renderizados em tela
function Content({ title }) {
  const { content: recipes } = useContext(AppContext);
  return (
    <div className="cards">
      { recipes.length === 1 && <Redirect
        to={ title === 'meals'
          ? `/meals/${recipes[0].idMeal}`
          : `/drinks/${recipes[0].idDrink}` }
      /> }
      {recipes.map((recipe, index) => {
        if (index <= MAX_RECIPES) {
          return (
            <RecipeCard
              key={ index }
              type={ title === 'meals' ? 'meal' : 'drink' }
              recipe={ recipe }
              index={ index }
            />
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
