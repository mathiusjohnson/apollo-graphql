import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import App from './components/App';
// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
  useQuery,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { cache } from './cache';
import LoginPage from './pages/Login';
import Header from './components/Header';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// 2
const httpLink = createHttpLink({
  cache,
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 3
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  const isLoggedIn = data.isLoggedIn;
  return isLoggedIn ? (
    <App isLoggedIn={isLoggedIn} />
  ) : (
    <div className="center w85">
      <Header isLoggedIn={isLoggedIn} />
      <div className="ph3 pv1 background-gray">
        <LoginPage />
      </div>
    </div>
  );
}
// 4
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
