import * as actionTypes from '../actions/types.js';

const formData = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.EDIT_POST:
      return {...state, ...action.formData}
    case actionTypes.EDIT_COMMENT:
      return {...state, ...action.formData}
    case actionTypes.EDIT_COMMENT_SUCCESS:
    case actionTypes.EDIT_POST_SUCCESS:
      return {}
    default:
      return state;
  }
}

export default formData;
