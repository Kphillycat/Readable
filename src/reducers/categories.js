import * as actionTypes from '../actions/types.js';

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

const categories = (state = initialCategoryState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVED_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default categories;
