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

export const Categories = (state = initialCategoryState, action) => {
  switch (action.type) {
    case 'SHOW_CATEGORY':
      return state;
      break;
    default:
      return state;
  }
};

const initialPostsState = [
  {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 1,
    deleted: false
  }
];

export const Posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case 'GET_POST':
      return state;
      break;
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

export const Comments = (state = initialCommentsState, action) => {
  switch (action.type) {
    case 'SHOW_COMMENT':
      return state;
      break;
    default:
      return state;
  }
};
