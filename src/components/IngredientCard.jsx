import React, { useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ index, ingredient, recipe, local, saved }) {
  const [checked, setChecked] = useState(saved.some((i) => i === ingredient));

  const getMeasures = () => Object.keys(recipe)
    .filter((key) => key.includes('Measure')).filter((item) => recipe[item]);

  const handleChecked = ({ target }) => {
    const id = local === 'meals' ? 'idMeal' : 'idDrink';
    if (checked) {
      setChecked(!checked);
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const savedIngredients = inProgress[local][recipe[id]]
        ? inProgress[local][recipe[id]] : [];
      const savedRecipe = inProgress[local];
      const newObj = {
        ...inProgress,
        [local]: {
          ...savedRecipe,
          [recipe[id]]: savedIngredients.filter((item) => item !== target.name) } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      // setSaved(newObj);
    } else {
      setChecked(!checked);
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const savedIngredients = inProgress[local][recipe[id]]
        ? inProgress[local][recipe[id]] : [];
      const savedRecipe = inProgress[local];
      const newObj = {
        ...inProgress,
        [local]: {
          ...savedRecipe,
          [recipe[id]]: [
            ...savedIngredients,
            target.name,
          ] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      // setSaved(newObj);
    }
  };

  return (
    <div
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      <label htmlFor="#" data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          name={ ingredient }
          checked={ checked }
          onChange={ handleChecked }
          className={ checked ? 'checked' : '' }
        />

        <div>{recipe[ingredient]}</div>
        <div>{recipe[getMeasures()[index]]}</div>
      </label>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  recipe: PropTypes.shape().isRequired,
  local: PropTypes.string.isRequired,
  saved: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientCard;
