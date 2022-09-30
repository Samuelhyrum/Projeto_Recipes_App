import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 57-62', () => {
  const pathProfile = '/profile';

  test('test if the email appears on the screen', async () => {
    renderWithRouter(<App />, { initialEntries: [pathProfile],
    });
    const emailElement = await screen.findByTestId('profile-email');

    expect(emailElement).toBeInTheDocument();
  });

  test('test clicks on recipe done button and redirection', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathProfile],
    });
    const recipesDoneButton = await screen.findByTestId('profile-done-btn');

    expect(recipesDoneButton).toBeInTheDocument();

    userEvent.click(recipesDoneButton);

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  test('test clicks on favorite recipes button and redirection', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathProfile],
    });
    const favoriteRecipesButton = await screen.findByTestId('profile-favorite-btn');

    expect(favoriteRecipesButton).toBeInTheDocument();

    userEvent.click(favoriteRecipesButton);

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  test('test clicks on logout button and redirection', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathProfile],
    });
    const logoutButton = await screen.findByTestId('profile-logout-btn');

    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
