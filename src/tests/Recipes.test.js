import React from 'react';
import { getNodeText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 20-23', () => {
  const pathMeals = '/meals';
  test('test clicks on category buttons', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Breakfast-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Fruit and Cream Cheese Breakfast Pastries');

    userEvent.click(link);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52957'));

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toBeInTheDocument();

    const recommendation = await screen.findByTestId('0-recommendation-card');
    expect(recommendation).toBeInTheDocument();
  });
  test('test clicks on copy buttom', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Beef-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Beef and Mustard Pie');

    userEvent.click(link);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52874'));
    window.document.execCommand = jest.fn().mockImplementation(() => 'ok');
    const CopyButton = await screen.findByTestId('share-btn');
    expect(CopyButton).toBeInTheDocument();
    userEvent.click(CopyButton);
    const ButtonFav = await screen.findByTestId('favorite-btn');
    expect(ButtonFav).toBeInTheDocument();
    userEvent.click(ButtonFav);
    userEvent.click(ButtonFav);

    const StartRecipe = await screen.findByTestId('start-recipe-btn');
    expect(StartRecipe).toBeInTheDocument();

    userEvent.click(StartRecipe);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52874/in-progress'));
  });
  test('test clicks on category buttons', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Beef-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Beef and Mustard Pie');

    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const ButtonBack = await screen.findByRole('img', { name: /back icon/i });

    expect(ButtonBack).toHaveAttribute('src', 'arrow-left.svg');
    expect(ButtonBack).toBeInTheDocument();

    userEvent.click(ButtonBack);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    userEvent.click(anotherButton);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const id = await screen.findByTestId('0-card-name');

    expect(id).toBeInTheDocument();
  });
  test('test clicks on category buttons, ALL BUTTON', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Breakfast-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('English Breakfast');

    expect(link).toBeInTheDocument();

    const ALL_BUTTON = await screen.findByTestId('All-category-filter');

    userEvent.click(ALL_BUTTON);

    await waitFor(() => expect(history.location.pathname).toBe('/meals'));

    const id = await screen.findByTestId('0-card-name');

    expect(id).toBeInTheDocument();

    expect(getNodeText(id)).toBe('Corba');
  });
});
