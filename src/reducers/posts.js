import omit from 'lodash.omit';
import * as actionTypes from '../actions/types.js';

const posts = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RECEIVED_POSTS:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actionTypes.ADD_POST_SUCCESS:
    case actionTypes.EDIT_POST_SUCCESS:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actionTypes.RECEIVED_VOTED_POST:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actionTypes.DELETE_POST_SUCCESS:
      return {
        postsById: omit(state.postsById, action.id)
      }
    default:
      return state;
  }
};

export default posts;
