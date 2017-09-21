import categories from './categories';
import posts from './posts';
import postsByCategories from './postsByCategories';
import comments from './comments';
import sortByKey from './sortByKey';
import formData from './formData';
import postDetail from './postDetail';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories,
  posts,
  postsByCategories,
  comments,
  sortByKey,
  formData,
  postDetail
});

export default rootReducer;
