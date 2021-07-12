import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import User from './User';

const USER_QUERY = gql`
  query {
    getAllUsers {
      id
      password
      username
      posts {
        textBody
        posterId
      }
    }
  }
`;

const UserList = () => {
  const { data } = useQuery(USER_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.getAllUsers.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;
