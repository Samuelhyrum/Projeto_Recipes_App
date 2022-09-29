import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';
import iconChef from '../images/icon_chef.svg';
import iconDone from '../images/icon_done.svg';
import iconYellowHeart from '../images/icon_yellow_heart.svg';
import iconLogout from '../images/icon_logout.svg';

function Profile() {
  const history = useHistory();
  const emails = JSON.parse(localStorage.getItem('user'));

  const goToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const goToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const goToLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div className="email-container">
        <img src={ iconChef } alt="profile icon" />
        <p
          data-testid="profile-email"
        >
          {emails?.email}
        </p>
      </div>

      <div className="btn-profile-container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ goToDoneRecipes }
        >
          <img src={ iconDone } alt="icon-done" />
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ goToFavoriteRecipes }
        >
          <img src={ iconYellowHeart } alt="icon-done" />
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ goToLogin }
        >
          <img src={ iconLogout } alt="icon-done" />
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
