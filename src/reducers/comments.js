import * as actionTypes from '../actions/types.js';
import omit from 'lodash.omit';

const comments = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.RECEIVED_COMMENTS_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actionTypes.ADD_COMMENT_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actionTypes.EDIT_COMMENT_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actionTypes.RECEIVED_VOTED_COMMENT:
      return {...state, ...action.normalized.entities.comment};
    case actionTypes.DELETE_COMMENT_SUCCESS:
      return omit(state, action.id)
    default:
      return state;
  }
};

export default comments;
