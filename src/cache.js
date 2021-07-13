import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));

export const cartItemsVar = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});
