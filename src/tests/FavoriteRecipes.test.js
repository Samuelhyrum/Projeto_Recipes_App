import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrinkId15997';

describe('testing requirement 57-62', () => {
  const pathFavorites = '/favorite-recipes';
  const pathHome = '/meals';
  const pathDetails = '/drinks/178319';

  test('test if the button of filters appears on the screen', async () => {
    renderWithRouter(<App />, { initialEntries: [pathFavorites],
    });
    const btnFilterAll = await screen.findByTestId('filter-by-all-btn');
    const btnFilterMeal = await screen.findByTestId('filter-by-meal-btn');
    const btnFilterDrink = await screen.findByTestId('filter-by-drink-btn');

    expect(btnFilterAll).toBeInTheDocument();

    userEvent.click(btnFilterAll);
    expect(btnFilterMeal).toBeInTheDocument();
    userEvent.click(btnFilterMeal);
    expect(btnFilterDrink).toBeInTheDocument();
  });
  test('test if the button of filters appears on the screen', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    const anotherButton = await screen.findByTestId('Breakfast-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Fruit and Cream Cheese Breakfast Pastries');

    userEvent.click(link);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52957'));

    const ButtonFav = await screen.findByTestId('favorite-btn');
    expect(ButtonFav).toBeInTheDocument();
    userEvent.click(ButtonFav);

    const ButtonBack = await screen.findByRole('img', { name: /back icon/i });

    expect(ButtonBack).toHaveAttribute('src', 'arrow-left.svg');
    expect(ButtonBack).toBeInTheDocument();

    userEvent.click(ButtonBack);
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const profile = await screen.findByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();

    userEvent.click(profile);
    const favoriteRecipesButton = await screen.findByTestId('profile-favorite-btn');

    expect(favoriteRecipesButton).toBeInTheDocument();

    userEvent.click(favoriteRecipesButton);

    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));

    const food = screen.getByTestId('0-horizontal-name');
    expect(food).toBeInTheDocument();
  });

  test('Test Local Storage', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals).mockResolvedValueOnce(oneDrink),
    });

    const InProgress = {
      drinks: { 178319: [] },
      meals: {},
    };

    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('inProgressRecipes', JSON.stringify(InProgress));

    renderWithRouter(<App />, { initialEntries: [pathDetails],
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const continueRecipe = screen.getByText('Continue Recipe');

    expect(continueRecipe).toBeInTheDocument();
  });

  test('Test Local Storage', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals).mockResolvedValueOnce(oneDrink),
    });

    const doneRecipes = [{
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/6/2020',
      tags: [],
    }];
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipes));

    renderWithRouter(<App />, { initialEntries: [pathDetails],
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const ButtonRecipe = screen.getAllByRole('button');

    expect(ButtonRecipe).toHaveLength(3);

    const ButtonFav = await screen.findByTestId('favorite-btn');

    expect(ButtonFav).toHaveProperty('src', 'http://localhost/blackHeartIcon.svg');
  });
});
