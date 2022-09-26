import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirements from 1 to 6', () => {
  const pathHome = '/meals';
  test('testing the operation of inputs, button and localStorage data', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });

    const FOOTER = screen.getByTestId('footer');
    const IMG_DRINKS = screen.getByTestId('drinks-bottom-btn');
    const IMG_MEALS = screen.getByTestId('meals-bottom-btn');

    expect(IMG_MEALS).toBeInTheDocument();
    expect(IMG_DRINKS).toBeInTheDocument();
    expect(FOOTER).toBeInTheDocument();

    userEvent.click(IMG_DRINKS);

    expect(history.location.pathname).toBe('/drinks');
  });
});
