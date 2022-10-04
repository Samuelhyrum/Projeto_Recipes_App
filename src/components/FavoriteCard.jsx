import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import './FavoriteCard.css';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteCard({ index, favorite, deleteFavorite }) {
  const [isCopy, setIsCopy] = useState({
    copied: false,
    recipeId: '',
  });

  const copyLinkToShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy({
      copied: true,
      recipeId: id,
    });
  };

  return (
    <div>
      <Link to={ `/${favorite.type}s/${favorite.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ favorite.image }
          alt="recipe"
          className="favorite-images"
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { favorite.name }
        </p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${favorite.nationality} - ${favorite.category} ` }
        { favorite.alcoholicOrNot ? favorite.alcoholicOrNot : '' }
      </p>

      { isCopy.copied && isCopy.recipeId === favorite.id
        ? <p>Link copied!</p>
        : (
          <button
            type="button"
            onClick={ () => copyLinkToShare(favorite.type, favorite.id) }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>)}

      <button
        type="button"
        onClick={ () => deleteFavorite(favorite.id) }
      >
        <img
          src={ blackHeartIcon }
          alt="shareIcon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

FavoriteCard.propTypes = {
  favorite: PropTypes.shape(),
  index: PropTypes.number,
  deleteFavorite: PropTypes.func,
}.isRequired;

export default FavoriteCard;
