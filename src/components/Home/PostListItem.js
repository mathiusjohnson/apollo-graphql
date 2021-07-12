import React from 'react';

const PostListItem = ({ post }) => {
  return (
    <div className="flex space-x-2">
      <div>{post.textBody}</div>
      <div className="italic">- {post.user.username}</div>
    </div>
  );
};

export default PostListItem;
