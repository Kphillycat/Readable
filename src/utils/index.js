import filter from 'lodash.filter';

export const getPostComments = (comments, postId) =>
  filter(comments, (comment) => comment.parentId === postId)

export const getNumberOfCommentsOfPost = (comments, postId) =>
  getPostComments(comments, postId).length;
