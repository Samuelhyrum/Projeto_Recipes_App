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
    const anotherButton = await screen.findByTestId('Beef-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Beef and Mustard Pie');

    userEvent.click(link);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52874'));
  });
  test('test clicks on category buttons', async () => {
    renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Beef-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('Beef and Mustard Pie');

    expect(link).toBeInTheDocument();

    userEvent.click(anotherButton);

    const id = await screen.findByTestId('0-card-name');

    expect(id).toBeInTheDocument();
  });
  test('test clicks on category buttons, ALL BUTTON', async () => {
    renderWithRouter(<App />, { initialEntries: [pathMeals],
    });
    const anotherButton = await screen.findByTestId('Breakfast-category-filter');

    expect(anotherButton).toBeInTheDocument();

    userEvent.click(anotherButton);

    const link = await screen.findByText('English Breakfast');

    expect(link).toBeInTheDocument();

    const ALL_BUTTON = await screen.findByTestId('All-category-filter');

    userEvent.click(ALL_BUTTON);

    const id = await screen.findByTestId('0-card-name');

    expect(id).toBeInTheDocument();

    expect(getNodeText(id)).toBe('Corba');
  });
});
