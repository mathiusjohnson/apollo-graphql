import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        username
        id
      }
    }
  }
`;

const Login = () => {
  const [error, setError] = useState('');
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    username: '',
    password: '',
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onError: ({ error }) => {
      setError('Incorrect Login Credentials, please try again');
      return;
    },
    onCompleted: ({ login }) => {
      const authStorage = {
        AUTH_TOKEN,
        token: login.token,
        user: login.user,
      };
      localStorage.setItem('auth', JSON.stringify(authStorage));
      history.push('/');
    },
  });

  return (
    <div>
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
        <button className="pointer mr2 button" onClick={login}>
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
    </div>
  );
};

export default Login;
