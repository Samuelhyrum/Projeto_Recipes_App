import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 9', () => {
  const pathHome = '/meals';
  const pathDrinks = '/drinks';
  const TEST_TEXT = 'a';
  const TEST_TWO = 'aa';
  const TEST_THREE = 'milk';
  const TEST_FOUR = 'big mac';
  const TEST_FIVE = '1';
  const TEST_SIX = 'potato';
  const TEST_SEVEN = 'Whisky';
  const TESTID_SEARCH = 'search-top-btn';
  const TESTID_SEARCHINPUT = 'search-input';
  const TESTID_FILTERBUTTON = 'exec-search-btn';
  const TESTID_RADIOLETTER = 'first-letter-search-radio';
  const TESTID_RADIOINGREDIN = 'ingredient-search-radio';

  test('testing if when there is a click on the magnifying glass, input appears', () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId('first-letter-search-radio');

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_LETTER).toBeInTheDocument();

    userEvent.click(RADIO_LETTER);

    userEvent.type(SEARCH_INPUT, TEST_TEXT);

    userEvent.click(FILTER_BUTTON);
  });
  test('testing if when there is a click on the magnifying glass, message appears', () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    global.alert = jest.fn();

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId(TESTID_RADIOLETTER);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_LETTER).toBeInTheDocument();

    userEvent.click(RADIO_LETTER);

    userEvent.type(SEARCH_INPUT, TEST_TWO);

    userEvent.click(FILTER_BUTTON);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
  test('testing if alert appears if the search is 1 in the first letter type', async () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    global.alert = jest.fn();

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId(TESTID_RADIOLETTER);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_LETTER).toBeInTheDocument();

    userEvent.click(RADIO_LETTER);

    userEvent.type(SEARCH_INPUT, TEST_FIVE);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
  test('testing if alert appears if the search is 1 in the first letter type', async () => {
    renderWithRouter(<App />, { initialEntries: [pathDrinks],
    });
    global.alert = jest.fn();

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId(TESTID_RADIOLETTER);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_LETTER).toBeInTheDocument();

    userEvent.click(RADIO_LETTER);

    userEvent.type(SEARCH_INPUT, '-');

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
  test('testing if when there is a click on the options "name" ', async () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    global.alert = jest.fn();

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_NAME = screen.getByTestId('name-search-radio');

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_NAME).toBeInTheDocument();

    userEvent.click(RADIO_NAME);

    userEvent.type(SEARCH_INPUT, TEST_THREE);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
  test('testing if when there is a click on the options "name" ', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_NAME = screen.getByTestId('name-search-radio');

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_NAME).toBeInTheDocument();

    userEvent.click(RADIO_NAME);

    userEvent.type(SEARCH_INPUT, TEST_FOUR);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/53013'));
  });
  test('testing if when there is a click on the options "ingredients" ', async () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    global.alert = jest.fn();

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_INGREDIENTS = screen.getByTestId(TESTID_RADIOINGREDIN);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_INGREDIENTS).toBeInTheDocument();

    userEvent.click(RADIO_INGREDIENTS);

    userEvent.type(SEARCH_INPUT, TEST_FOUR);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
  });
  test('testing if when there is a click on the options "ingredients" ', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathHome],
    });

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_INGREDIENTS = screen.getByTestId(TESTID_RADIOINGREDIN);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_INGREDIENTS).toBeInTheDocument();

    userEvent.click(RADIO_INGREDIENTS);

    userEvent.type(SEARCH_INPUT, TEST_SIX);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52782'));
  });
  test('testing if when there is a click on the options "ingredients" DRINKS ', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [pathDrinks],
    });

    const SEARCH_BUTTON = screen.getByTestId(TESTID_SEARCH);

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId(TESTID_SEARCHINPUT);

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_INGREDIENTS = screen.getByTestId(TESTID_RADIOINGREDIN);

    const FILTER_BUTTON = screen.getByTestId(TESTID_FILTERBUTTON);

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_INGREDIENTS).toBeInTheDocument();

    userEvent.click(RADIO_INGREDIENTS);

    userEvent.type(SEARCH_INPUT, TEST_SEVEN);

    userEvent.click(FILTER_BUTTON);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/16262'));
  });
});
