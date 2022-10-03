import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchFirstLetter, fetchIngrediets, fetchName } from '../services/fetchAPI';

const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';
export default function AppProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    from: '',
  });
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [activatedCategory, setActivatedCategory] = useState({
    activated: false,
    categoryFilter: '',
  });

  const getEmail = () => {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify({ email: '' }));
    }
  };

  const fetchData = async (filter) => {
    let data = '';
    switch (filter.type) {
    case 'name':
      data = await fetchName(filter.search, filter.from);
      if (data === null) {
        global.alert(ERROR_MESSAGE);
        break;
      }
      setContent(data);
      break;

    case 'first letter':
      data = await fetchFirstLetter(filter.search, filter.from);
      if (data === null) {
        global.alert(ERROR_MESSAGE);
        break;
      }
      setContent(data);
      break;

    case 'ingredients':
      data = await fetchIngrediets(filter.search, filter.from);
      if (data === null) {
        global.alert(ERROR_MESSAGE);
        break;
      }
      setContent(data);
      break;
    default:
      break;
    }
  };

  // preparar o objeto pra salvar no local storage
  const objectToFavorite = (local, recipeDetails, id) => {
    const type = local === 'meals' ? 'meal' : 'drink';
    const nationality = recipeDetails.strArea || '';
    const category = recipeDetails.strCategory || '';
    const alcoholicOrNot = recipeDetails.strAlcoholic || '';
    const name = local === 'meals'
      ? recipeDetails.strMeal
      : recipeDetails.strDrink;
    const image = local === 'meals'
      ? recipeDetails.strMealThumb
      : recipeDetails.strDrinkThumb;

    return {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
  };

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  useEffect(() => {
    getEmail();
  }, []);

  const contextInfo = {
    showSearch,
    content,
    filters,
    filteredContent,
    activatedCategory,
    setShowSearch,
    setFilters,
    setContent,
    setFilteredContent,
    setActivatedCategory,
    objectToFavorite,
  };

  return (
    <AppContext.Provider value={ contextInfo }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
