import * as actions from '../actions';
import orderBy from 'lodash.orderby';
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

const initialPostsState = {
  sortedPosts: [{
    id: '0',
    timestamp: Number(new Date('1/1/1990')),
    title: 'TEST TITLE',
    body: 'Chupa chups liquorice tootsie roll jelly-o marshmallow pastry bonbon pie. Toffee carrot cake caramels. Chocolate ice cream tiramisu cheesecake macaroon jujubes brownie croissant. Apple pie marshmallow lemon drops bear claw carrot cake brownie marzipan oat cake chupa chups. Candy canes jelly muffin gummies pastry sweet roll bear claw bear claw. Cake sugar plum cotton candy cupcake. Bear claw sugar plum carrot cake jujubes. Pie fruitcake gingerbread. Cake cake marzipan. Croissant sugar plum sesame snaps ice cream marshmallow cake chocolate cake chocolate bar apple pie. Tootsie roll icing jelly beans dessert toffee chocolate cake apple pie fruitcake. Marshmallow soufflé tart tiramisu. Candy canes cake halvah candy topping.',
    author: 'ME',
    category: 'redux',
    voteScore: 1,
    deleted: false
  }],
  postsById: {
      '0': {
        id: '0',
        timestamp: Number(new Date('1/1/1990')),
        title: 'TEST TITLE',
        body: 'Chupa chups liquorice tootsie roll jelly-o marshmallow pastry bonbon pie. Toffee carrot cake caramels. Chocolate ice cream tiramisu cheesecake macaroon jujubes brownie croissant. Apple pie marshmallow lemon drops bear claw carrot cake brownie marzipan oat cake chupa chups. Candy canes jelly muffin gummies pastry sweet roll bear claw bear claw. Cake sugar plum cotton candy cupcake. Bear claw sugar plum carrot cake jujubes. Pie fruitcake gingerbread. Cake cake marzipan. Croissant sugar plum sesame snaps ice cream marshmallow cake chocolate cake chocolate bar apple pie. Tootsie roll icing jelly beans dessert toffee chocolate cake apple pie fruitcake. Marshmallow soufflé tart tiramisu. Candy canes cake halvah candy topping.',
        author: 'ME',
        category: 'redux',
        voteScore: 1,
        deleted: false
      }
    },
  postsByCategory: {

  }
};

export const posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case actions.RECEIVED_POSTS:
      return {
        sortedPosts: orderBy({...state.postsById, ...action.normalized.entities.post}, DEFAULT_SORT_KEY, ['desc']),
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actions.ADD_POST_SUCCESS:
      return {
        sortedPosts: orderBy({...state.postsById, ...action.normalized.entities.post}, DEFAULT_SORT_KEY, ['desc']),
        postsById: {...state.postsById, ...action.normalized.entities.post}
      }
    case actions.FILTER_POSTS:
      return {
        sortedPosts: orderBy({...action.normalized.entities.post}, DEFAULT_SORT_KEY, ['desc']),
        postsById: {...action.normalized.entities.post}
      }
    case actions.SORT_POSTS:
      return {
        sortedPosts: orderBy(state.postsById, action.sortByKey, ['desc']),
        postsById: {...state.postsById}
      }
    default:
      return state;
  }
};

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
