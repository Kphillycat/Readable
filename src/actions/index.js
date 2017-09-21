import * as api from '../api';
import { DEFAULT_SORT_KEY } from '../constants';
import { normalize } from 'normalizr';
import * as schema from './schema';
import * as actionTypes from './types';

export const sortPosts = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: actionTypes.SORT_POSTS,
  sortByKey
});

export const sortComments = (sortByKey = DEFAULT_SORT_KEY) => ({
  type: actionTypes.SORT_COMMENTS,
  sortByKey
});

export const receivedPosts = (posts) => ({
  type: actionTypes.RECEIVED_POSTS,
  posts,
  normalized: normalize(posts, schema.arrayOfPosts)
});

export const receivedPostsByCategory = (posts, category) => ({
  type: actionTypes.RECEIVED_POSTS_BY_CATEGORY,
  posts,
  category,
  normalized: normalize(posts, schema.arrayOfPosts)
});

export const editingPost = (formData) => ({
  type: actionTypes.EDIT_POST,
  formData
});

export const editingComment = (formData) => ({
  type: actionTypes.EDIT_COMMENT,
  formData
});

export const addPostSuccess = (post) => ({
    type: actionTypes.ADD_POST_SUCCESS,
    post,
    normalized: normalize(post, schema.arrayOfPosts)
})

export const editPostSuccess = (post) => ({
    type: actionTypes.EDIT_POST_SUCCESS,
    post,
    normalized: normalize(post, schema.arrayOfPosts)
})

export const getPostDetailSuccess = (post) => ({
  type: actionTypes.RECEIVED_POST_DETAIL,
  post,
  normalized: normalize(post, schema.post)
})

export const receivedCommentsSuccess = (comments) => ({
  type: actionTypes.RECEIVED_COMMENTS_SUCCESS,
  comments,
  normalized: normalize(comments, schema.arrayOfComments)
})

export const addCommentSuccess = (comment) => ({
  type: actionTypes.ADD_COMMENT_SUCCESS,
  comment,
  normalized: normalize(comment, schema.comment)
})

export const editCommentSuccess = (comment) => ({
  type: actionTypes.EDIT_COMMENT_SUCCESS,
  comment,
  normalized: normalize(comment, schema.comment)
})

export const receivedVotedPostSuccess = (post) => ({
  type: actionTypes.RECEIVED_VOTED_POST,
  post,
  normalized: normalize(post, schema.post),
  category: post.category
})

export const deletePostSuccess = (id) => ({
  type: actionTypes.DELETE_POST_SUCCESS,
  id
})

export const deleteCommentSuccess = (id) => ({
  type: actionTypes.DELETE_COMMENT_SUCCESS,
  id
})

export const receivedVotedCommentSuccess = (comment) => ({
  type: actionTypes.RECEIVED_VOTED_COMMENT,
  comment,
  normalized: normalize(comment, schema.comment)
})

export const receivedCategories = (categories) => ({
  type: actionTypes.RECEIVED_CATEGORIES,
  categories
});

export const fetchPosts = (category) => (dispatch) => {
  if(category !== 'all') {
    return api.getPostsByCategory(category).then((posts) => {
      posts = posts.filter((post) => !post.deleted);
      dispatch(receivedPostsByCategory(posts, category));
    }
    );
  } else {
    return api.getPosts().then(posts => {
      posts = posts.filter((post) => !post.deleted);
      // Get all the comments
      posts.forEach((post) =>
        dispatch(fetchComments(post.id))
      )
      return dispatch(receivedPosts(posts))
    }
    );
  }
};

export const addPost = (post) => (dispatch) =>
  api.addPost(post).then((response) =>
    dispatch(addPostSuccess(response))
  );

export const editPost = (post) => (dispatch) =>
  api.editPost(post, post.id).then((response) =>
    dispatch(editPostSuccess(response))
  )

export const getPostDetail = (id) => (dispatch) =>
  api.getPostsById(id).then((response) =>
    dispatch(getPostDetailSuccess(response))
  )

export const fetchComments = (id) => (dispatch) =>
  api.getCommentsByPost(id).then(response =>
    dispatch(receivedCommentsSuccess(response))
  )

export const voteOnPost = (voteType, id) => (dispatch) =>
  api.voteOnPost(voteType, id).then(response =>
    dispatch(receivedVotedPostSuccess(response))
  )

export const addComment = (comment) => (dispatch) =>
  api.addComment(comment).then(response =>
    dispatch(addCommentSuccess(response))
  )

export const editComment = (comment, id) => (dispatch) =>
  api.editComment(comment, id).then(response =>
    dispatch(editCommentSuccess(response))
  )

export const voteOnComment = (voteType, id) => (dispatch) =>
  api.voteOnComment(voteType, id).then(response =>
    dispatch(receivedVotedCommentSuccess(response))
  )

export const getCategories = () => (dispatch) =>
  api.getCategories().then(response =>
    dispatch(receivedCategories(response))
  )

export const deletePost = (id) => (dispatch) =>
  api.deletePost(id).then(response => {
    if(response.status === 200) {
      dispatch(deletePostSuccess(id));
    }
  })

export const deleteComment = (id) => (dispatch) =>
  api.deleteComment(id).then(response => {
    if(response.status === 200) {
      dispatch(deleteCommentSuccess(id));
    }
  })
