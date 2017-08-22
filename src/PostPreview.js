import React, { Component } from 'react';

class PostPreview extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.post);
  }

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
            <a href="#" onClick={this.handleClick}>Edit Post</a>
          </div>
    );
  }
}

export default PostPreview;
