import React from 'react';
import { Link } from 'react-router-dom';
import meals from '../images/mealIcon.svg';
import drinks from '../images/drinkIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <Link
        to="/meals"
      >
        <img
          src={ meals }
          alt="Meals"
          data-testid="meals-bottom-btn"
        />
      </Link>
      <Link
        to="/drinks"
      >
        <img
          src={ drinks }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>

    </footer>
  );
}

// TODO LEMBRAR DE ZERAR A VARIÁVEL RECIPES NO CONTENT. Está bugando os cards

export default Footer;
