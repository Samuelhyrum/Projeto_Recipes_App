import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails, fetchName } from '../services/fetchAPI';
import VideoComponent from '../components/VideoComponent';
import RecipeCard from '../components/RecipeCard';
import './RecipeDetails.css';

const MAX_RECOMENDATIONS = 6;
function RecipeDetails({ match: { path, params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [local, setLocal] = useState('');

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

  useEffect(() => {
    getRecipeDetails();
    getRecomendations();
    setLocal(path.split('/')[1]);
  }, []); // eslint-disable-line
  return (
    <div>
      <img
        src={ recipeDetails[local === 'meals' ? 'strMealThumb' : 'strDrinkThumb'] }
        alt={ recipeDetails[local === 'meals' ? 'strMeal' : 'strDrink'] }
        data-testid="recipe-photo"
      />
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
