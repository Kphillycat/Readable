import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
  handleVote = (voteType, id) => {
    this.props.handleCommentVote(voteType, id);
  }

  handleEdit = (comment) => {
    this.props.handleCommentEdit(comment);
  }

  handleDelete = (id) => {
    this.props.handleCommentDelete(id);
  }

  render() {
    const { comments } = this.props;
    return (
      <div>
        {comments.map((comment) =>
          <Comment
            key={comment.id}
            comment={comment}
            handleVote={this.handleVote}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            />
        )}
      </div>
    )
  }
}

export default Comments;
