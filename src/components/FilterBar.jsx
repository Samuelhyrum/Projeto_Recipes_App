import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFilterByCategories } from '../services/fetchAPI';
import './FilterBar.css';
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

const MAX_CATEGORIES = 4;

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

  const titlePage = title;

  const fetchCategories = async () => {
    const data = await fetchFilterByCategories(title);
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);  // eslint-disable-line

  return (
    <div className="category-container">
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
