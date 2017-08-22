import * as api from '../api';
import { DEFAULT_SORT_KEY } from '../constants';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVED_POSTS_BY_CATEGORY = 'RECEIVED_POSTS_BY_CATEGORY';

export const sortPosts = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: SORT_POSTS,
  sortByKey
});

export const receivedPosts = (posts) => ({
  type: RECEIVED_POSTS,
  posts,
  normalized: normalize(posts, schema.arrayOfPosts)
});

export const receivedPostsByCategory = (posts, category) => ({
  type: RECEIVED_POSTS_BY_CATEGORY,
  posts,
  category,
  normalized: normalize(posts, schema.arrayOfPosts)
});

export const fetchPosts = (category) => (dispatch) => {
  if(category !== 'all') {
    return api.getPostsByCategory(category).then((posts) =>
      dispatch(receivedPostsByCategory(posts, category))
    );
  } else {
    return api.getPosts().then(posts =>
      dispatch(receivedPosts(posts))
    );
  }
};

export const addPost = (post) => (dispatch) =>
  api.addPost(post).then((response) =>
    dispatch({
      type: ADD_POST_SUCCESS,
      post: response,
      normalized: normalize(response, schema.arrayOfPosts)
    })
  );
