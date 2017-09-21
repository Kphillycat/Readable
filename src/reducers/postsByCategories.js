import * as actionTypes from '../actions/types.js';

const postsByCategories = (state = {}, action) => {
  switch(action.type){
    case actionTypes.RECEIVED_POSTS_BY_CATEGORY:
      return {
        [action.category]: {...state[action.category], ...action.normalized.entities.post}
      }
    case actionTypes.RECEIVED_VOTED_POST:
      return {
        [action.category]: {...state[action.category], ...action.normalized.entities.post}
      }
    default:
      return state;
  }
}

export default postsByCategories;
