import * as api from '../api';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const FILTER_POSTS = 'FILTER_POSTS';

export const receivedPosts = (posts) => ({
  type: RECEIVED_POSTS,
  posts
});

export const fetchPosts = () => (dispatch) => {
  return api.getPosts().then(posts =>
    dispatch(receivedPosts(posts))
  );
}

export const addPost = (post) => (dispatch) =>
  api.addPost(post).then((response) =>
    dispatch({
      type: ADD_POST_SUCCESS,
      response
    })
  );

export const fetchPostsByCategory = (category) => (dispatch) =>
  api.getPostsByCategory(category).then((posts) =>
    dispatch({
      type: FILTER_POSTS,
      posts
    })
  );
