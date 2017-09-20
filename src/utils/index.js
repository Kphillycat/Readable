import filter from 'lodash.filter';

export const getPostComments = (comments, postId) =>
  filter(comments, (comment) => comment.parentId === postId)

export const getNumberOfCommentsOfPost = (comments, postId) =>
  getPostComments(comments, postId).length;

export const formatDate = (date) => {
  let dateToFormat = new Date(date);
  return dateToFormat.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"})
}
