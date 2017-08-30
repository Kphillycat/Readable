import * as api from '../api';
import { DEFAULT_SORT_KEY } from '../constants';
import { normalize } from 'normalizr';
import * as schema from './schema';

export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const SORT_POSTS = 'SORT_POSTS';
export const RECEIVED_POSTS_BY_CATEGORY = 'RECEIVED_POSTS_BY_CATEGORY';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVED_POST_DETAIL = 'RECEIVED_POST_DETAIL';
export const RECEIVED_COMMENTS_SUCCESS = 'RECEIVED_COMMENTS_SUCCESS';
export const RECEIVED_VOTED_POST = 'RECEIVED_VOTED_POST';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';

export const sortPosts = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: SORT_POSTS,
  sortByKey
});

export const sortComments = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: SORT_COMMENTS,
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

export const editingPost = (formData) => ({
  type: EDIT_POST,
  formData
});

export const addPostSuccess = (post) => ({
    type: ADD_POST_SUCCESS,
    post,
    normalized: normalize(post, schema.arrayOfPosts)
})

export const getPostDetailSuccess = (post) => ({
  type: RECEIVED_POST_DETAIL,
  post,
  normalized: normalize(post, schema.post)
})

export const receivedCommentsSuccess = (comments) => ({
  type: RECEIVED_COMMENTS_SUCCESS,
  comments,
  normalized: normalize(comments, schema.arrayOfComments)
})

export const addCommentSuccess = (comment) => ({
  type: ADD_COMMENT_SUCCESS,
  comment,
  normalized: normalize(comment, schema.comment)
})

export const receivedVotedPostSuccess = (post) => ({
  type: RECEIVED_VOTED_POST,
  post,
  normalized: normalize(post, schema.post),
  category: post.category
})

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
    dispatch(addPostSuccess(response))
  );

export const editPost = (post) => (dispatch) =>
  api.editPost(post, post.id).then((response) =>
    dispatch(addPostSuccess(response))
  )

export const getPostDetail = (id) => (dispatch) =>
  api.getPostsById(id).then((response) =>
    dispatch(getPostDetailSuccess(response))
  )

export const fetchComments = (id) => (dispatch) =>
  api.getCommentsByPost(id).then(response =>
    dispatch(receivedCommentsSuccess(response))
  )

export const votePost = (voteType, id) => (dispatch) =>
  api.votePost(voteType, id).then(response =>
    dispatch(receivedVotedPostSuccess(response))
  )

export const addComment = (comment) => (dispatch) =>
  api.addComment(comment).then(response =>
    dispatch(addCommentSuccess(response))
  )
