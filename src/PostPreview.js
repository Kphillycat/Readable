import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class PostPreview extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.handleEdit(this.props.post);
  }

  handleVoteClick = (voteType) => {
    this.props.handleVote(voteType, this.props.post.id);
  }

  handleDeleteClick = (event) => {
    event.preventDefault();
    this.props.handleDelete(this.props.post.id);
  }

  render() {
    const { post, commentNumbers } = this.props;
    return (
      <Card>
        <CardHeader
          title={post.title}
          subtitle={`Votes: ${post.voteScore}, Date: ${new Date(post.timestamp).toString()},
              Category: ${post.category}, Number of Comments: ${commentNumbers}`}
          ></CardHeader>
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
            onClick={() => {this.handleVoteClick('upVote')}}
            label="UpVote"
          />
          <RaisedButton
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
            onClick={this.handleDeleteClick}
            label="Delete Post"
          />
        </CardActions>
      </Card>
    );
  }
}

export default PostPreview;
