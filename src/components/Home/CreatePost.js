import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';

const CREATE_POST_MUTATION = gql`
  mutation ($textBody: String!, $posterId: String!) {
    createPost(createPostInput: { textBody: $textBody, posterId: $posterId }) {
      id
      posterId
      textBody
    }
  }
`;

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const onContentChanged = (e) => setPostText(e.target.value);

  const authToken = JSON.parse(localStorage.getItem('auth'))
    ? JSON.parse(localStorage.getItem('auth'))
    : '';
  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      textBody: postText,
      posterId: authToken.user.id,
    },
    onError: (error) => {
      console.log(error);
    },
    // onCompleted: () => history.push('/'),
  });
  return (
    <form onSubmit={createPost} className="flex space-x-2">
      <textarea onChange={onContentChanged} className="rounded-lg"></textarea>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
