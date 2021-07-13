import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { isLoggedInVar } from '../cache';

import { AUTH_TOKEN } from '../constants';

const Header = ({ isLoggedIn }) => {
  const authToken = localStorage.getItem('auth');
  const client = useApolloClient();
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link to="/" className="ml1 no-underline black">
          home
        </Link>
        {/* <div className="ml1">|</div> */}
        {/* <Link to="/top" className="ml1 no-underline black">
          top
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link> */}
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {isLoggedIn ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              client.cache.evict({ fieldName: 'isLoggedIn' });
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              isLoggedInVar(false);
            }}
          >
            logout
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Header;
