import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import * as actions from './actions';
import orderBy from 'lodash.orderby';
import SortControl from './SortControl';
import Comments from './Comments';
import { getPostComments } from './utils';
import CommentFormContainer from './CommentFormContainer';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import { getNumberOfCommentsOfPost } from './utils';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';

class PostDetail extends Component {
  state = {
    id: '',
    author: '',
    body: '',
    timestamp: '',
    parentId: ''
  }

  componentDidMount() {
    this.props.dispatch(actions.getPostDetail(this.props.postId));
    this.props.dispatch(actions.fetchComments(this.props.postId));
  }

  handleSortOnChange = (event, index, value) => {
    const sortByKey = value;
    this.props.dispatch(actions.sortComments(sortByKey));
  }

  handleCommentVote = (voteType, commentId) => {
    this.props.dispatch(actions.voteOnComment(voteType, commentId));
  }

  handleCommentEdit = (comment) => {
    this.props.dispatch(actions.editingComment(comment));
    this.props.history.push('/comment/edit');
  }

  handleCommentDelete = (commentId) => {
    this.props.dispatch(actions.deleteComment(commentId));
  }

  handlePostVote = (voteType) => {
    const postId = this.props.state.postDetail.id;
    this.props.dispatch(actions.voteOnPost(voteType, postId));
  }

  render () {
    const { postDetail, sortByKey } = this.props.state;
    const { orderedComments, commentNumbers } = this.props;
    return (
      <div>

        <Card>
          <CardTitle
            title={postDetail.title}
            subtitle={`Author: ${postDetail.author}, Votes: ${postDetail.voteScore}, Date: ${new Date(postDetail.timestamp).toString()},
                Category: ${postDetail.category}, Number of Comments: ${commentNumbers}`}
            ></CardTitle>
          <CardText>
            {postDetail.body}
          </CardText>
          <CardActions>
            {/* Voting */}
            <RaisedButton
              icon={<ThumbUp />}
              onClick={() => {this.handlePostVote('upVote')}}
              label="UpVote"
            />
            <RaisedButton
              icon={<ThumbDown />}
              onClick={() => {this.handlePostVote('downVote')}}
              label="DownVote"
            />
          </CardActions>
        </Card>
        {/* Comment */}
        <SortControl handleOnChange={this.handleSortOnChange} sortByKey={sortByKey.value}/>
        <h2>Comments</h2>
        <Comments
          comments={orderedComments}
          handleCommentVote={this.handleCommentVote}
          handleCommentEdit={this.handleCommentEdit}
          handleCommentDelete={this.handleCommentDelete}
          />
        {/** Add new comment **/}
        <CommentFormContainer
          parentId={postDetail.id}
          />
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const postId = get(routerParams, 'match.params.id');
  const commentsByPostId = getPostComments(state.comments, postId);
  const orderedComments = orderBy(commentsByPostId, state.sortByKey.value, ['desc']);
  const commentNumbers = getNumberOfCommentsOfPost(orderedComments, postId);
  return {
    state,
    postId,
    orderedComments,
    commentNumbers
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
