import * as api from '../api';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';

export const receivedPost = (posts) => ({
  type: RECEIVED_POSTS,
  posts
});

export const fetchPosts = () => (dispatch) => {
  return api.getPosts().then(posts => { dispatch(receivedPost(posts)) });
}
