import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 9', () => {
  const pathHome = '/meals';
  const pathDrinks = '/drinks';
  test('testing if when there is click render profile', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });

    const BUTTON = screen.getByTestId('profile-top-btn');

    expect(BUTTON).toBeInTheDocument();

    userEvent.click(BUTTON);

    expect(history.location.pathname).toBe('/profile');

    const DRINK_BUTTON = screen.getByTestId('drinks-bottom-btn');

    expect(DRINK_BUTTON).toBeInTheDocument();

    userEvent.click(DRINK_BUTTON);

    expect(history.location.pathname).toBe('/drinks');
  });
  test('testing if when there is a click on the magnifying glass, input appears', () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    const SEARCH_BUTTON = screen.getByTestId('search-top-btn');

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId('search-input');

    expect(SEARCH_INPUT).toBeInTheDocument();
  });
  test('testing if when there is a click on the magnifying glass, input appears', () => {
    renderWithRouter(<App />, { initialEntries: [pathDrinks],
    });
    const SEARCH_BUTTON = screen.getByTestId('search-top-btn');

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId('search-input');

    expect(SEARCH_INPUT).toBeInTheDocument();
  });
});
