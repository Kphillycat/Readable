import * as actionTypes from '../actions/types.js';
import { DEFAULT_SORT_KEY } from '../constants';

const initialSortByKey = {
  value: DEFAULT_SORT_KEY
};

const sortByKey = (state = initialSortByKey, action) =>  {
  switch(action.type) {
    case actionTypes.SORT_POSTS:
      return {value: action.sortByKey};
    case actionTypes.SORT_COMMENTS:
      return {value: action.sortByKey};
    default:
      return state;
  }
}

export default sortByKey;
