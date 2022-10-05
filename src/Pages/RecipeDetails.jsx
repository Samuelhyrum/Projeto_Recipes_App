import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { fetchDetails, fetchName } from '../services/fetchAPI';
import VideoComponent from '../components/VideoComponent';
import RecipeCard from '../components/RecipeCard';
import './RecipeDetails.css';
// import DoneRecipes from './DoneRecipes';

import arrowLeftIcon from '../images/arrow-left.svg';
import shareIcon from '../images/share.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

const MAX_RECOMENDATIONS = 6;

function RecipeDetails({ match: { path, params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [local, setLocal] = useState('');

  const [visible, setVisible] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState();

  const { objectToFavorite, doneRecipes,
    savedFavorites,
    inProgressRecipes } = useContext(AppContext);

  const history = useHistory();

  const getRecipeDetails = async () => {
    const data = await fetchDetails(id, path.split('/')[1]);
    setRecipeDetails(data.find((rec) => rec));
  };

  const getRecomendations = async () => {
    const from = path.split('/')[1] === 'meals' ? 'drinks' : 'meals';
    const data = await fetchName('', from);
    setRecomendations(data);
  };

  const getIngredients = () => Object.keys(recipeDetails)
    .filter((key) => key.includes('Ingredient'));

  const getMeasures = () => Object.keys(recipeDetails)
    .filter((key) => key.includes('Measure'));

  const update = () => {
    getRecipeDetails();
    getRecomendations();
    setLocal(path.split('/')[1]);
  };

  const goBack = () => {
    history.goBack();
  };

  const copyLinkToShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  const btnFavoriteRecipe = () => {
    if (favorite) {
      setFavorite(!favorite);
      const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const deleteRecipe = savedRecipes.filter((recipe) => +recipe.id !== +id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteRecipe));
    } else {
      setFavorite(!favorite);
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, (objectToFavorite(local, recipeDetails, id))]));
    }
  };

  useEffect(() => {
    update();
  }, [path, id]); // eslint-disable-line

  useEffect(() => {
    if (doneRecipes
      .map((recipe) => +recipe.id).includes(+id)) {
      setVisible(false);
    } else setVisible(true);
  }, [doneRecipes]); // eslint-disable-line

  useEffect(() => {
    if (inProgressRecipes[local] ? Object.keys(inProgressRecipes[local])
      .includes(id) : false) {
      setContinueRecipe(true);
    } else {
      setContinueRecipe(false);
    }
  }, [inProgressRecipes]); // eslint-disable-line

  useEffect(() => {
    if (savedFavorites.some((recipe) => recipe.id === id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [savedFavorites]); // eslint-disable-line

  const handleClick = () => {
    history.push(`/${local}/${id}/in-progress`);
  };

  return (
    <div>
      <img
        src={ recipeDetails[local === 'meals' ? 'strMealThumb' : 'strDrinkThumb'] }
        alt={ recipeDetails[local === 'meals' ? 'strMeal' : 'strDrink'] }
        data-testid="recipe-photo"
      />

      <section>
        <div>
          <button
            type="button"
            onClick={ goBack }
          >
            <img src={ arrowLeftIcon } alt="back icon" />
          </button>
        </div>

        <div>
          {
            copied
              ? <p>Link copied!</p>
              : (
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ copyLinkToShare }
                >
                  <img src={ shareIcon } alt="share icon" />
                </button>)
          }
        </div>
        <div>
          <button
            type="button"
            onClick={ btnFavoriteRecipe }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="shareIcon"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </section>

      <section>
        <hr />
        <div>
          <p
            data-testid="recipe-title"
          >
            {recipeDetails[local === 'meals' ? 'strMeal' : 'strDrink']}
          </p>
          <p
            data-testid="recipe-category"
          >
            {recipeDetails[local === 'meals' ? 'strCategory' : 'strAlcoholic']}
          </p>
        </div>
        <div>
          {getIngredients().map((ingredient, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <div>{recipeDetails[ingredient]}</div>
              <div>{recipeDetails[getMeasures()[index]]}</div>
            </div>
          ))}
        </div>
        <div>
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        </div>
        <div>
          {(recipeDetails.strYoutube && local === 'meals')
            && <VideoComponent video={ recipeDetails.strYoutube } />}
        </div>
        <section className="recomendations">
          {recomendations.length > 0 && recomendations.map((recipe, index) => {
            if (index < MAX_RECOMENDATIONS) {
              return (
                <RecipeCard
                  key={ index }
                  type={ local === 'meals' ? 'drink' : 'meal' }
                  recipe={ recipe }
                  index={ index }
                  cardTestId={ `${index}-recommendation-card` }
                  titleTestId={ `${index}-recommendation-title` }
                />
              );
            }
            return null;
          })}
        </section>
      </section>
      {visible ? (
        <button
          type="button"
          className="visible"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {
            continueRecipe ? 'Continue Recipe' : 'Start Recipe'
          }
        </button>
      ) : ''}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
