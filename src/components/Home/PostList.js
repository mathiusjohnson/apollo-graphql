import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import PostListItem from './PostListItem';

export const POSTS_QUERY = gql`
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
  const { data } = useQuery(POSTS_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.getAllPosts.map((post) => (
            <PostListItem key={post.id} post={post} POSTS_QUERY={POSTS_QUERY} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
