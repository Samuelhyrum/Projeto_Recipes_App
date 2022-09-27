import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 9', () => {
  const pathHome = '/meals';
  test('testing if when there is click render profile', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });

    const BUTTON = screen.getByTestId('profile-top-btn');

    expect(BUTTON).toBeInTheDocument();

    userEvent.click(BUTTON);
    expect(history.location.pathname).toBe('/profile');
  });
});
