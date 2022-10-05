import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import arrowLeftIcon from '../images/arrow-left.svg';
import shareIcon from '../images/share.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function OptionBar({ favorite, btnFavoriteRecipe, id, local }) {
  const history = useHistory();
  const [copied, setCopied] = useState();

  const copyLinkToShare = () => {
    copy(`http://localhost:3000/${local}/${id}`);
    setCopied(true);
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <section>
      <button
        type="button"
        onClick={ goBack }
      >
        <img src={ arrowLeftIcon } alt="back icon" />
      </button>

      <div>
        {
          copied
            ? <p>Link copied!</p>
            : (
              <button
                type="button"
                data-testid="share-btn"
                onClick={ copyLinkToShare }
              >
                <img src={ shareIcon } alt="share icon" />
              </button>)
        }
        <button
          type="button"
          onClick={ btnFavoriteRecipe }
        >
          <img
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="shareIcon"
            data-testid="favorite-btn"
          />
        </button>
      </div>
    </section>
  );
}

OptionBar.propTypes = {
  favorite: PropTypes.bool,
  btnFavoriteRecipe: PropTypes.func,
}.isRequired;

export default OptionBar;
