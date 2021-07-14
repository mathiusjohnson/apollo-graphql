import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useVisualMode from '../../hooks/useVisualMode';
import EditPostForm from './EditPostForm';

const SHOW = 'SHOW';
// const CONFIRM = "CONFIRM";
// const SAVING = "SAVING";
const EDITING = 'EDITING';
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

const DELETE_POST_MUTATION = gql`
  mutation ($id: String!) {
    removePost(id: $id) {
      __typename
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation ($textBody: String!, $id: String!) {
    updatePost(updatePostInput: { textBody: $textBody, id: $id }) {
      id
      textBody
    }
  }
`;

const PostListItem = ({ post }) => {
  const [postText, setPostText] = useState(post.textBody);

  const history = useHistory();
  const { mode, transition } = useVisualMode(SHOW);

  function onEdit() {
    transition(EDITING);
  }

  function onSaveEdit() {
    updatePost();
    transition(SHOW);
  }

  const loggedInUserId = localStorage.getItem('userId');
  const myPost = loggedInUserId === post.user.id;

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: {
      id: post.id,
    },
    update(cache, { data: { removePost } }) {
      const normalizedId = cache.identify({
        id: post.id,
        __typename: 'Post',
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => history.push('/'),
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      textBody: postText,
      id: post.id,
    },
    onError: (error) => {
      console.log(error);
    },
    // onCompleted: () => history.push('/'),
  });

  return (
    <form onSubmit={updatePost} className="flex space-x-2">
      <div className="flex space-x-2 my-1">
        {mode === SHOW && <div>{post.textBody}</div>}
        {mode === EDITING && (
          <EditPostForm postText={postText} setPostText={setPostText} />
        )}
        <div className="italic">- {post.user.username}</div>
        {myPost ? (
          <div className="space-x-2">
            <button onClick={deletePost} className="btn btn-warning">
              Delete
            </button>
            {mode === SHOW && (
              <button onClick={onEdit} className="btn btn-warning">
                Edit
              </button>
            )}
            {mode === EDITING && (
              <button
                type="submit"
                onClick={onSaveEdit}
                className="btn btn-primary"
              >
                Save
              </button>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </form>
  );
};

export default PostListItem;
