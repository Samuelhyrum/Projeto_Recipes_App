import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchDetails } from '../services/fetchAPI';
import OptionBar from '../components/OptionBar';
import AppContext from '../context/AppContext';
import IngredientCard from '../components/IngredientCard';

function RecipeInProgress({ match: { path, params: { id } } }) {
  const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { objectToFavorite, savedFavorites } = useContext(AppContext);

  const [saved, setSaved] = useState(progress || { meals: {}, drinks: {} });
  const [recipe, setRecipe] = useState([]);
  const [local, setLocal] = useState('');
  const [favorite, setFavorite] = useState(false);

  const getRecipe = async () => {
    const data = await fetchDetails(id, path.split('/')[1]);
    setRecipe(data.find((rec) => rec));
  };

  const update = () => {
    getRecipe();
    setLocal(path.split('/')[1]);
  };

  const getIngredients = () => Object.keys(recipe)
    .filter((key) => key.includes('Ingredient')).filter((item) => recipe[item]);

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

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(saved));
  }, [saved]);

  return (
    <div>
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
          {getIngredients().map((ingredient, index) => (
            <IngredientCard
              key={ ingredient }
              index={ index }
              ingredient={ ingredient }
              recipe={ recipe }
              local={ local }
              setSaved={ setSaved }
              saved={ saved }
            />
          ))}
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
