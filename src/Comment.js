import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { formatDate } from './utils';

class Comment extends Component {
  state = {
    dialogOpen: false
  };

  handleVoteClick = (voteType) => {
    this.props.handleVote(voteType, this.props.comment.id);
  }

  handleEditClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.comment);
  }

  deleteDialogOpen = () => {
    this.setState({dialogOpen: true});
  }

  deleteDialogClose = () => {
    this.setState({dialogOpen: false});
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.comment.id);
  }

  render(){
    const { comment } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.deleteDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.handleDeleteClick}
      />
    ];
    return (
      <div>
        <Card>
          <CardTitle
            title={`${comment.author} on ${formatDate(comment.timestamp)} Said:`}
            subtitle={`${comment.voteScore} Votes`}
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
              onClick={this.deleteDialogOpen}
              label="Delete Comment"
            />
            {/* Delete confirmation modal */}
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to delete?
            </Dialog>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default Comment;
