import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';

const EditPostForm = ({ postText, postId, setPostText, updatePost }) => {
  const onContentChanged = (e) => setPostText(e.target.value);

  return (
    <textarea
      value={postText}
      onChange={onContentChanged}
      className="rounded-lg"
    ></textarea>
  );
};

export default EditPostForm;
