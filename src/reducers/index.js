import * as actions from '../actions';
import { DEFAULT_SORT_KEY } from '../constants';

const initialSortByKey = {
  value: DEFAULT_SORT_KEY
};

export const sortByKey = (state = initialSortByKey, action) =>  {
  switch(action.type) {
    case actions.SORT_POSTS:
      return {value: action.sortByKey};
    default:
      return state;
  }
}

const initialCategoryState = [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
];

export const categories = (state = initialCategoryState, action) => {
  switch (action.type) {
    case 'SHOW_CATEGORY':
      return action.category;
    default:
      return state;
  }
};

export const posts = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVED_POSTS:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actions.ADD_POST_SUCCESS:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    default:
      return state;
  }
};

export const postsByCategories = (state = {}, action) => {
  switch(action.type){
    case actions.RECEIVED_POSTS_BY_CATEGORY:
      return {
        [action.category]: {...state[action.category], ...action.normalized.entities.post}
      }
    default:
      return state;
  }
}

const initialCommentsState = [
  {
    id: '',
    parentId: '',
    timestamp: '',
    body: '',
    author: '',
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  }
];

export const comments = (state = initialCommentsState, action) => {
  switch (action.type) {
    case 'SHOW_COMMENT':
      return state;
    default:
      return state;
  }
};

export const formData = (state = {}, action) => {
  switch(action.type) {
    case actions.EDIT_POST:
      return {...state, ...action.formData}
    default:
      return state;
  }
}
