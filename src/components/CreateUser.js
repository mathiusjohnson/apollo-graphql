import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';

const CREATE_USER_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    createUser(createUserInput: { username: $username, password: $password }) {
      id
      password
      username
    }
  }
`;

const CreateUser = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password,
    },
    onCompleted: () => history.push('/'),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value,
              })
            }
            type="text"
            placeholder="A username"
          />
          <input
            className="mb2"
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            type="text"
            placeholder="The password for the user"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateUser;
