import * as api from '../api';
import { DEFAULT_SORT_KEY } from '../constants';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const FILTER_POSTS = 'FILTER_POSTS';
export const SORT_POSTS = 'SORT_POSTS';

export const sortPosts = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: SORT_POSTS,
  sortByKey
});

export const receivedPosts = (posts) => ({
  type: RECEIVED_POSTS,
  posts
});

export const receivedFilterPosts = (posts) => ({
  type: FILTER_POSTS,
  posts
});

export const fetchPosts = (category) => (dispatch) => {
  if(category !== 'all') {
    console.log('==== FETCHING POSTS FOR CATEGORY ', category);
    return api.getPostsByCategory(category).then((posts) =>
      dispatch(receivedFilterPosts(posts))
    );
  } else {
    console.log('==== FETCHING ALL POSTS ');
    return api.getPosts().then(posts =>
      dispatch(receivedPosts(posts))
    );
  }
};

export const addPost = (post) => (dispatch) =>
  api.addPost(post).then((response) =>
    dispatch({
      type: ADD_POST_SUCCESS,
      response
    })
  );

// export const fetchPostsByCategory = (category) => (dispatch) =>
//   api.getPostsByCategory(category).then((posts) =>
//     dispatch({
//       type: FILTER_POSTS,
//       posts
//     })
//   );
