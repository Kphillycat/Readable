import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class PostPreview extends Component {
  state = {
    dialogOpen: false
  };

  handleClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.post);
  }

  handleVoteClick = (voteType) => {
    this.props.handleVote(voteType, this.props.post.id);
  }

  deleteDialogOpen = () => {
    this.setState({dialogOpen: true});
  }

  deleteDialogClose = () => {
    this.setState({dialogOpen: false});
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.post.id);
  }

  render() {
    const { post, commentNumbers } = this.props;
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
      <Card>
        <CardTitle
          title={post.title}
          subtitle={`Author: ${post.author}, Votes: ${post.voteScore}, Date: ${new Date(post.timestamp).toString()},
              Category: ${post.category}, Number of Comments: ${commentNumbers}`}
          ></CardTitle>
        <CardText>
          {post.body.substring(0,30)}
        </CardText>
        <CardActions>
          <RaisedButton
            containerElement={ <Link to={`/post/view/${post.id}`}/> }
            label="View Post"
          />
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
          <RaisedButton
            onClick={this.handleClick}
            label="Edit Post"
          />
          {/* Delete Post */}
          <RaisedButton
            backgroundColor="red"
            onClick={this.deleteDialogOpen}
            label="Delete Post"
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
    );
  }
}

export default PostPreview;
