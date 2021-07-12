import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import PostListItem from './PostListItem';

const USER_QUERY = gql`
  query {
    getAllPosts {
      id
      textBody
      posterId
      user {
        username
      }
    }
  }
`;

const PostList = () => {
  const { data } = useQuery(USER_QUERY);
  console.log(data);
  return (
    <div>
      {data && (
        <>
          {data.getAllPosts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
