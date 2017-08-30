import React, { Component } from 'react';

class Comment extends Component {
  handleVoteClick = (event) => {
    event.preventDefault();
    this.props.handleVote(event.target.id, this.props.comment.id);
  }

  render(){
    const { comment } = this.props;
    return (
      <div style={{
          listStyleType: "none",
          border: "solid black 1px"
        }}>
          <p>Body: {comment.body}</p>
          <p>Author: {comment.author} </p>
          <p>Time: {new Date(comment.timestamp).toString()} </p>
          <p>Vote Score: {comment.voteScore} </p>
          {/* Vote */}
          <button onClick={this.handleVoteClick} id="upVote">UpVote</button>
          <button onClick={this.handleVoteClick} id="downVote">DownVote</button>
      </div>
    );
  }
}

export default Comment;
