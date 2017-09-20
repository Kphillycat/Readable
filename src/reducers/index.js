import * as actions from '../actions';
import { DEFAULT_SORT_KEY } from '../constants';
import omit from 'lodash.omit';

const initialSortByKey = {
  value: DEFAULT_SORT_KEY
};

export const sortByKey = (state = initialSortByKey, action) =>  {
  switch(action.type) {
    case actions.SORT_POSTS:
      return {value: action.sortByKey};
    case actions.SORT_COMMENTS:
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
    case actions.RECEIVED_CATEGORIES:
      return action.categories;
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
    case actions.EDIT_POST_SUCCESS:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actions.RECEIVED_VOTED_POST:
      return {
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actions.DELETE_POST_SUCCESS:
      return {
        postsById: omit(state.postsById, action.id)
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
    case actions.RECEIVED_VOTED_POST:
      return {
        [action.category]: {...state[action.category], ...action.normalized.entities.post}
      }
    default:
      return state;
  }
}

export const postDetail = (state = {}, action) => {
  switch(action.type){
    case actions.RECEIVED_POST_DETAIL:
      return {...state, ...action.post}
    case actions.RECEIVED_VOTED_POST:
      return {...state, ...action.post}
    default:
      return state;
  }
}

export const comments = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVED_COMMENTS_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actions.ADD_COMMENT_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actions.EDIT_COMMENT_SUCCESS:
      return {...state, ...action.normalized.entities.comment};
    case actions.RECEIVED_VOTED_COMMENT:
      return {...state, ...action.normalized.entities.comment};
    case actions.DELETE_COMMENT_SUCCESS:
      return omit(state, action.id)
    default:
      return state;
  }
};

export const formData = (state = {}, action) => {
  switch(action.type) {
    case actions.EDIT_POST:
      return {...state, ...action.formData}
    case actions.EDIT_COMMENT:
      return {...state, ...action.formData}
    case actions.EDIT_COMMENT_SUCCESS:
    case actions.EDIT_POST_SUCCESS:
      return {}
    default:
      return state;
  }
}
