import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const history = useHistory();

  const goToProfile = () => {
    history.push('/profile');
  };

  return (
    <header>
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>

      <button
        type="button"
        onClick={ goToProfile }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />

      </button>

      { title === 'Meals' || title === 'Drinks'
        ? (
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
          />)
        : '' }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
