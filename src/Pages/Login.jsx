import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PASSWORD_MIN_LENGTH = 6;

function Login() {
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const validateButton = () => {
    let disabled = true;
    const validator = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const validation = [
      loginState.email.length > 0,
      loginState.password.length > PASSWORD_MIN_LENGTH,
      validator.test(loginState.email),
    ];

    if (validation.every((item) => item === true)) {
      disabled = false;
      localStorage.setItem('user', JSON.stringify({ email: loginState.email }));
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('drinksToken', JSON.stringify(1));
    }

    return disabled;
  };

  const handleChange = ({ target }) => {
    setLoginState({
      ...loginState,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/meals');
  };
  return (
    <form onSubmit={ handleSubmit }>
      <label
        htmlFor="email"
      >
        Email
        <input
          name="email"
          type="text"
          placeholder="Digite seu email"
          data-testid="email-input"
          value={ loginState.email }
          onChange={ handleChange }
        />
      </label>
      <br />
      <label htmlFor="password">
        Senha
        <input
          name="password"
          type="password"
          placeholder="Digite sua senha"
          data-testid="password-input"
          value={ loginState.password }
          onChange={ handleChange }
        />
      </label>
      <br />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ validateButton() }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
