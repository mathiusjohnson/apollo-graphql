import React from 'react';

const User = (props) => {
  const { user } = props;
  return (
    <div>
      <div>{user.username}</div>
    </div>
  );
};

export default User;
