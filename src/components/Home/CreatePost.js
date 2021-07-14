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

  const userId = localStorage.getItem('userId');

  const [createPost, { data, error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      textBody: postText,
      posterId: userId ? userId : '',
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onHandlePostSubmitted = (e) => {
    e.preventDefault();
    console.log('submitted!');
    createPost();
  };

  return (
    <form onSubmit={(e) => onHandlePostSubmitted(e)} className="flex space-x-2">
      <textarea onChange={onContentChanged} className="rounded-lg"></textarea>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
