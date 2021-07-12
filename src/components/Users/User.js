import React from 'react';
import UserPosts from './UserPosts';

const User = (props) => {
  const { user } = props;
  const renderedPosts = user.posts.map((post, index) => {
    return <UserPosts key={index} post={post} />;
  });

  return (
    <div>
      <div>{user.username}</div>
      <div>{renderedPosts}</div>
    </div>
  );
};

export default User;
