import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context/AppContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Header.css';

function Header({ title }) {
  const { showSearch, setShowSearch } = useContext(AppContext);

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  let imageTitle = '';
  if (title === 'Meals') {
    imageTitle = mealIcon;
  } else if (title === 'Drinks') {
    imageTitle = drinkIcon;
  }

  return (
    <header className="header">
      <div className="title-container">
        {(title !== 'Meals' || title !== 'Drinks') ? ''
          : <img src={ imageTitle } alt="" />}
        <div
          data-testid="page-title"
        >
          {title}
        </div>
      </div>
      <div className="icon-container">
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
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
