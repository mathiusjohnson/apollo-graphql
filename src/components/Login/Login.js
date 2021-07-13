import gql from 'graphql-tag';
import React, { useState } from 'react';

const Login = ({ login }) => {
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username: formState.username,
        password: formState.password,
      },
    });
  };

  return (
    <form onSubmit={(e) => handleLoginSubmit(e)}>
      <h4 className="mv3">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
            })
          }
          type="text"
          placeholder="Your username"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button className="pointer mr2 button">
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
        <div className="text-red-500">{error}</div>
      </div>
    </form>
  );
};

export default Login;
