const endPoints = {
  ingredients: '/api/json/v1/1/filter.php?i=',
  name: '/api/json/v1/1/search.php?s=',
  first: '/api/json/v1/1/search.php?f=',
};
const API = {
  meals: 'https://www.themealdb.com',
  drinks: 'https://www.thecocktaildb.com',
};

export const fetchIngrediets = async (search, from) => {
  if (from === 'meals') {
    const response = await fetch(`${API.meals}${endPoints.ingredients}${search}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`${API.drinks}${endPoints.ingredients}${search}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchName = async (search, from) => {
  if (from === 'meals') {
    const response = await fetch(`${API.meals}${endPoints.name}${search}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`${API.drinks}${endPoints.name}${search}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchFirstLetter = async (search, from) => {
  if (from === 'meals') {
    const response = await fetch(`${API.meals}${endPoints.first}${search}`);
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch(`${API.drinks}${endPoints.first}${search}`);
  const data = await response.json();
  return data.drinks;
};
