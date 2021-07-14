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

const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    postAdded {
      id
      textBody
    }
  }
`;

const PostList = () => {
  const { data, subscribeToMore } = useQuery(POSTS_QUERY, {
    pollInterval: 500,
  });

  const renderedPosts =
    data &&
    data.getAllPosts.map((post) => {
      return <PostListItem key={post.id} post={post} />;
    });

  subscribeToMore({
    document: NEW_POSTS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      console.log(subscriptionData);
      if (!subscriptionData.data) return prev;
      const postAdded = subscriptionData.data.postAdded;
      const exists = prev.getAllPosts.find(({ id }) => id === postAdded.id);
      if (exists) return prev;
      console.log('in subscription: ', prev.getAllPosts, postAdded);
      return Object.assign({}, prev, {
        posts: [postAdded, ...prev.getAllPosts],
      });
    },
  });
  return <div>{renderedPosts}</div>;
};

export default PostList;
