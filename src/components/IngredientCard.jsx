import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ index, ingredient, recipe, local, saved }) {
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    const id = local === 'meals' ? 'idMeal' : 'idDrink';
    console.log(saved[local][recipe[id]]);
    const savedIngredients = saved[local][recipe[id]]
      ? saved[local][recipe[id]] : [];
    console.log(savedIngredients.includes(ingredient));
    if (savedIngredients.includes(ingredient)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);
  return (
    <div
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      <label htmlFor="#" data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          name={ ingredient }
          defaultChecked={ checked }
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
  // setSaved: PropTypes.func.isRequired,
  saved: PropTypes.shape().isRequired,
};

export default IngredientCard;
