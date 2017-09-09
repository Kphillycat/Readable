import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostPreview extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.post);
  }

  handleVoteClick = (event) => {
    event.preventDefault();
    this.props.handleVote(event.target.id, this.props.post.id);
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.post.id);
  }

  render() {
    const { post, commentNumbers } = this.props;
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
            <p>
              Number of Comments: {commentNumbers}
            </p>
            <button onClick={this.handleDeleteClick}>Delete Post</button>
            <button onClick={this.handleClick}>Edit Post</button>
            <Link to={`/post/view/${post.id}`}>View Post</Link>
            {/* Vote */}
            <button onClick={this.handleVoteClick} id="upVote">UpVote</button>
            <button onClick={this.handleVoteClick} id="downVote">DownVote</button>
          </div>
    );
  }
}

export default PostPreview;
