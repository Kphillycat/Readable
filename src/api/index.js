const endpoint = "http://localhost:3000";

const headers = {
  Authorization: 'boomshakalaka'
}

export const getCategories = () =>
  fetch(`${endpoint}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostsByCategory = (category) =>
  fetch(`${endpoint}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPosts = () =>
  fetch(`${endpoint}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

/***
id - UUID should be fine, but any unique id will work
timestamp - timestamp in whatever format you like, you can use Date.now() if you like
title - String
body - String
owner - String
category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
***/
export const addPost = (params) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const getPostsById = (id) =>
  fetch(`${endpoint}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

/***
params: option - String: Either "upVote" or "downVote"
***/
export const votePost = (params, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

/***
params:
  title - String
  body - String
***/
export const editPost = (params, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (params, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const getCommentsByPost = (id) =>
  fetch(`${endpoint}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

/**
params:
id: Any unique ID. As with posts, UUID is probably the best here.
timestamp: timestamp. Get this however you want.
body: String
owner: String
parentId: Should match a post id in the database.
**/
export const addComment = (params) =>
  fetch(`${api}/comment`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const getCommentById = (id) =>
  fetch(`${endpoint}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)


/**
params:
timestamp: timestamp. Get this however you want.
body: String
**/
export const addComment = (params, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const editComment = (params, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)

export const deleteComment = (params, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  }).then(res => res.json())
    .then(data => data)
