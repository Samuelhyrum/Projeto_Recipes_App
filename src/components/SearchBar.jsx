import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SearchBar({ title }) {
  const [fields, setFields] = useState({
    search: '',
    type: '',
    from: title,
  });
  const { setFilters } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setFields({
      ...fields,
      [target.name]: target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    if ((fields.type === 'first letter' && fields.search.length > 1)) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setFilters(fields);
    }
  };
  return (
    <form>
      <input
        type="search"
        name="search"
        data-testid="search-input"
        placeholder="Buscar"
        value={ fields.search }
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="ingredients">
          <input
            type="radio"
            name="type"
            id="ingredients"
            data-testid="ingredient-search-radio"
            value="ingredients"
            onChange={ handleChange }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="type"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Name
        </label>
        <label htmlFor="first letter">
          <input
            type="radio"
            name="type"
            id="first letter"
            data-testid="first-letter-search-radio"
            value="first letter"
            onChange={ handleChange }
          />
          First letter
        </label>
      </div>
      <button
        type="submit"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Filter

      </button>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default SearchBar;
