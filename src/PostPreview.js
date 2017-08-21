import React, { Component } from 'react';

class PostPreview extends Component {
  render() {
    const { post } = this.props;
    return (
      <div style={
              {
                border: "solid black 1px"
              }
            }>
            <p>
              {post.title}
            </p>
            <p>
              {post.body.substring(0,30)}
            </p>
            <p>
              Votes: {post.voteScore}
            </p>
            <p>
              Date: {new Date(post.timestamp).toString()}
            </p>
            <p>
              Category: {post.category}
            </p>
          </div>
    );
  }
}

export default PostPreview;
