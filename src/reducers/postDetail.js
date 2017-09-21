import * as actionTypes from '../actions/types.js';

const postDetail = (state = {}, action) => {
  switch(action.type){
    case actionTypes.RECEIVED_POST_DETAIL:
      return {...state, ...action.post}
    case actionTypes.RECEIVED_VOTED_POST:
      return {...state, ...action.post}
    default:
      return state;
  }
}

export default postDetail;
