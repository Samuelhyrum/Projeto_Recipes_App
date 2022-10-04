import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchDetails } from '../services/fetchAPI';
import OptionBar from '../components/OptionBar';
import AppContext from '../context/AppContext';

function RecipeInProgress({ match: { path, params: { id } } }) {
  const { objectToFavorite, savedFavorites } = useContext(AppContext);

  const [recipe, setRecipe] = useState([]);
  const [local, setLocal] = useState('');
  const [favorite, setFavorite] = useState(false);

  const getRecipe = async () => {
    const data = await fetchDetails(id, path.split('/')[1]);
    console.log(data);
    setRecipe(data.find((rec) => rec));
  };

  const update = () => {
    getRecipe();
    setLocal(path.split('/')[1]);
  };

  const getIngredients = () => Object.keys(recipe)
    .filter((key) => key.includes('Ingredient')).filter((item) => recipe[item]);

  const getMeasures = () => Object.keys(recipe)
    .filter((key) => key.includes('Measure')).filter((item) => recipe[item]);

  const btnFavoriteRecipe = () => {
    if (favorite) {
      setFavorite(!favorite);
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const deleteRecipe = savedRecipes.filter((item) => +item.id !== +id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteRecipe));
    } else {
      setFavorite(!favorite);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, (objectToFavorite(local, recipe, id))]));
    }
  };

  useEffect(() => {
    update();
  }, [path, id]); // eslint-disable-line

  useEffect(() => {
    if (savedFavorites.some((item) => item.id === id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [savedFavorites]); // eslint-disable-line

  return (
    <div>
      {console.log(getIngredients())}
      <img
        src={ recipe[local === 'meals' ? 'strMealThumb' : 'strDrinkThumb'] }
        alt={ recipe[local === 'meals' ? 'strMeal' : 'strDrink'] }
        data-testid="recipe-photo"
      />

      <OptionBar
        btnFavoriteRecipe={ btnFavoriteRecipe }
        favorite={ favorite }
        id={ id }
        local={ local }
      />

      <section>
        <div>
          <p data-testid="recipe-title">
            {recipe[local === 'meals' ? 'strMeal' : 'strDrink']}
          </p>
          <p data-testid="recipe-category">
            {recipe[local === 'meals' ? 'strCategory' : 'strAlcoholic']}
          </p>
        </div>
        <div>
          {getIngredients().map((ingredient, index) => {
            console.log(recipe[ingredient]);
            return (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <label htmlFor="#" data-testid={ `${index}-ingredient-step` }>
                  <input type="checkbox" />

                  <div>{recipe[ingredient]}</div>
                  <div>{recipe[getMeasures()[index]]}</div>
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <button type="submit" data-testid="finish-recipe-btn">
          Finish Recipe
        </button>
      </section>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;
