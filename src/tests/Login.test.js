import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testing requirements from 1 to 6', () => {
  const EMAIL_TEST = 'samuelhymp@gmail.com';
  const PASSOWRD_TEST = '1234567';

  test('testing the operation of inputs, button and localStorage data', () => {
    const { history } = renderWithRouter(<App />);

    const INPUT_EMAIL = screen.getByTestId('email-input');
    const INPUT_PASSOWRD = screen.getByTestId('password-input');
    const BUTTON = screen.getByRole('button');

    expect(INPUT_EMAIL).toBeInTheDocument();
    expect(INPUT_PASSOWRD).toBeInTheDocument();
    expect(BUTTON).toBeInTheDocument();

    userEvent.type(INPUT_EMAIL, EMAIL_TEST);
    userEvent.type(INPUT_PASSOWRD, PASSOWRD_TEST);

    expect(BUTTON).toBeDefined();

    userEvent.click(BUTTON);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
