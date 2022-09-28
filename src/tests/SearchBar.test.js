import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirement 9', () => {
  const pathHome = '/meals';
  const TEST_TEXT = 'a';
  const TEST_TWO = 'aa';

  test('testing if when there is a click on the magnifying glass, input appears', () => {
    renderWithRouter(<App />, { initialEntries: [pathHome],
    });
    const SEARCH_BUTTON = screen.getByTestId('search-top-btn');

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId('search-input');

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId('first-letter-search-radio');

    const FILTER_BUTTON = screen.getByTestId('exec-search-btn');

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

    const SEARCH_BUTTON = screen.getByTestId('search-top-btn');

    expect(SEARCH_BUTTON).toBeInTheDocument();

    userEvent.click(SEARCH_BUTTON);

    const SEARCH_INPUT = screen.getByTestId('search-input');

    expect(SEARCH_INPUT).toBeInTheDocument();

    const RADIO_LETTER = screen.getByTestId('first-letter-search-radio');

    const FILTER_BUTTON = screen.getByTestId('exec-search-btn');

    expect(FILTER_BUTTON).toBeInTheDocument();

    expect(RADIO_LETTER).toBeInTheDocument();

    userEvent.click(RADIO_LETTER);

    userEvent.type(SEARCH_INPUT, TEST_TWO);

    userEvent.click(FILTER_BUTTON);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
