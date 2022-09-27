import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';

function Header({ title }) {
  const { showSearch, setShowSearch } = useContext(AppContext);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header>
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      { (title === 'Meals' || title === 'Drinks')
        && (
          <button type="submit" onClick={ handleShowSearch }>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
            />

          </button>)}
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </Link>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
