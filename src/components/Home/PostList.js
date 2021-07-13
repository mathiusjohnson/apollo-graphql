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
        id
      }
    }
  }
`;

const PostList = () => {
  const { data } = useQuery(POSTS_QUERY);
  const renderedPosts =
    data &&
    data.getAllPosts.map((post) => {
      return (
        <PostListItem key={post.id} post={post} POSTS_QUERY={POSTS_QUERY} />
      );
    });
  return <div>{renderedPosts}</div>;
};

export default PostList;
