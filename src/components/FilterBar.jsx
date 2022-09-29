import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchFilterByCategories, fetchFilteredContent } from '../services/fetchAPI';
import './FilterBar.css';

// importação de imagens
import beerSolid from '../images/beer_solid.svg';
import chicken from '../images/chicken.svg';
import cocktail from '../images/cocktail.svg';
import coffee from '../images/coffee.svg';
import cow from '../images/cow.svg';
import drink from '../images/drink.svg';
// import egg from '../images/egg.svg';
import sheep from '../images/sheep.svg';
import shortcake from '../images/shortcake.svg';
import toast from '../images/toast.svg';
import wine from '../images/wine.svg';
import AppContext from '../context/AppContext';

const MAX_CATEGORIES = 4;

// isso aqui depois vai virar um componente só para ícone
const MEALS_ICONS = [
  cow,
  toast,
  chicken,
  shortcake,
  sheep,
];

const DRINKS_ICONS = [
  wine,
  cocktail,
  drink,
  beerSolid,
  coffee,
];

function FilterBar({ title }) {
  const [categories, setCategories] = useState([]);
  const {
    activatedCategory,
    setFilteredContent,
    setActivatedCategory,
  } = useContext(AppContext);

  const titlePage = title;

  const fetchCategories = async () => {
    const data = await fetchFilterByCategories(title);
    setCategories(data);
  };

  const filterByCategory = async (category) => {
    const data = await fetchFilteredContent(category, title);
    setFilteredContent(data);
    setActivatedCategory({
      activated: true,
      categoryFilter: category,
    });
    if (activatedCategory.activated && activatedCategory.categoryFilter === category) {
      setActivatedCategory({
        activated: false,
        categoryFilter: '',
      });
    } else {
      setActivatedCategory({
        activated: true,
        categoryFilter: category,
      });
    }
  };

  const clearFilter = () => {
    setActivatedCategory({
      activated: false,
      categoryFilter: '',
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []); // eslint-disable-line

  return (
    <div className="category-container">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ clearFilter }
      >
        All
      </button>
      {categories.map((category, index) => {
        if (index <= MAX_CATEGORIES) {
          return (
            <div
              className="buttons-container"
              key={ index }
            >
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                type="button"
                onClick={ () => filterByCategory(category.strCategory) }
              >
                {titlePage === 'meals' ? <img src={ MEALS_ICONS[index] } alt="" />
                  : <img src={ DRINKS_ICONS[index] } alt="" /> }

              </button>
              <div
                className="category-name"
                data-testid={ `${category.strCategory}` }
              >
                {category.strCategory}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

FilterBar.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FilterBar;
