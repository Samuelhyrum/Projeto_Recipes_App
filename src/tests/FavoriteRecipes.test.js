import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 57-62', () => {
  const pathFavorites = '/favorite-recipes';

  test('test if the button of filters appears on the screen', async () => {
    renderWithRouter(<App />, { initialEntries: [pathFavorites],
    });
    const btnFilterAll = await screen.findByTestId('filter-by-all-btn');
    const btnFilterMeal = await screen.findByTestId('filter-by-meal-btn');
    const btnFilterDrink = await screen.findByTestId('filter-by-drink-btn');

    expect(btnFilterAll).toBeInTheDocument();
    expect(btnFilterMeal).toBeInTheDocument();
    expect(btnFilterDrink).toBeInTheDocument();
  });
});
