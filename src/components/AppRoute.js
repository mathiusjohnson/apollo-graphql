/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AppRoute = ({
  component: Component,
  path,
  isPrivate,
  props,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem('auth') ? true : false;
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && isLoggedIn === null ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoute;
