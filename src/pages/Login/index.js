import React from 'react';
import { gql, useMutation } from '@apollo/client';

import LoginPage from '../../components/Login';
import Loading from '../../components/loading';
import { isLoggedInVar } from '../../cache';

export const LOGIN_USER = gql`
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

const index = () => {
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      if (login) {
        localStorage.setItem('token', login.token);
        localStorage.setItem('userId', login.user.id);
        isLoggedInVar(true);
      }
    },
  });
  // if (loading) return <Loading />;

  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <LoginPage login={login} />
    </div>
  );
};

export default index;
