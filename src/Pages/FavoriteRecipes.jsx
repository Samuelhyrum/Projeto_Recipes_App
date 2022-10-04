import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getByLocalStorage = () => {
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(savedFavorites);
    }
  };

  const deleteFavorite = (id) => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const deleteRecipe = savedRecipes.filter((recipe) => +recipe.id !== +id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteRecipe));
    getByLocalStorage();
  };

  const filterByMeal = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = savedFavorites
      .filter((favorite) => favorite.type === 'meal');
    setFavoriteRecipes(filteredFavorites);
  };

  const filterByDrink = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavorites = savedFavorites
      .filter((favorite) => favorite.type === 'drink');
    setFavoriteRecipes(filteredFavorites);
  };

  const clearAllFilters = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(savedFavorites);
  };

  useEffect(() => {
    getByLocalStorage();
  }, []);

  useEffect(() => {
  }, [favoriteRecipes]);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ clearAllFilters }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ filterByMeal }
      >
        Meal
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterByDrink }
      >
        Drink
      </button>
      { favoriteRecipes.map((favorite, index) => (
        <FavoriteCard
          favorite={ favorite }
          index={ index }
          key={ index }
          deleteFavorite={ deleteFavorite }
        />
      )) }
    </div>
  );
}

export default FavoriteRecipes;
