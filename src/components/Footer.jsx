import React from 'react';
import { Link } from 'react-router-dom';
import meals from '../images/mealIcon.svg';
import drinks from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="fixarRodape"
    >
      <Link
        to="/drinks"
      >
        <img
          src={ drinks }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link
        to="/meals"
      >
        <img
          src={ meals }
          alt="Meals"
          data-testid="meals-bottom-btn"
        />
      </Link>

    </footer>
  );
}

export default Footer;
