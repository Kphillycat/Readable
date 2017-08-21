postsByIds = (state = {}, action) => {
  if(action.normalized) {
    return {
      ...state,
      ...action.normalized.entities.posts,
    }
  }
}

export default postsByIds;

export const getPost(id, state) {
  return {
    state[id]
  }
}
