import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';

class Comment extends Component {
  handleVoteClick = (voteType) => {
    this.props.handleVote(voteType, this.props.comment.id);
  }

  handleEditClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.comment);
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.comment.id);
  }

  render(){
    const { comment } = this.props;
    return (
      <div style={{
          border: "solid black 1px"
        }}>

        <Card>
          <CardTitle
            title={`Commenter: ${comment.author}`}
            subtitle={`${comment.voteScore} Votes - Date: ${new Date(comment.timestamp).toString()}`}
            ></CardTitle>
          <CardText>
            {comment.body}
          </CardText>
          <CardActions>
            {/* Voting */}
            <RaisedButton
              icon={<ThumbUp />}
              onClick={() => {this.handleVoteClick('upVote')}}
              label="UpVote"
            />
            <RaisedButton
              icon={<ThumbDown />}
              onClick={() => {this.handleVoteClick('downVote')}}
              label="DownVote"
            />
            {/* Edit Comment */}
            <RaisedButton
              onClick={this.handleEditClick}
              label="Edit Comment"
            />
            {/* Delete Comment */}
            <RaisedButton
              backgroundColor="red"
              onClick={this.handleDeleteClick}
              label="Delete Comment"
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Comment;
