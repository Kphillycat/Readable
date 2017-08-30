import React, { Component } from 'react';

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <ul>
        {comments.map((comment) =>
          <li key={comment.id} style={{
              listStyleType: "none",
              border: "solid black 1px"
            }}>
            <p>Body: {comment.body}</p>
            <p>Author: {comment.author} </p>
            <p>Time: {new Date(comment.timestamp).toString()} </p>
            <p>Vote Score: {comment.voteScore} </p>
          </li>
        )}
      </ul>
    )
  }
}

export default Comments;
