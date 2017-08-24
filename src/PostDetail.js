import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import * as actions from './actions';
import orderBy from 'lodash.orderby';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getPostDetail(this.props.postId));
    this.props.dispatch(actions.fetchComments(this.props.postId));
  }

  render () {
    console.log('---- PostDetail ', this.props);
    const { postDetail } = this.props.state;
    const { orderedComments } = this.props;
    return (
      <div>
        <h3>{postDetail.title}</h3>
        <p>{postDetail.body}</p>
        <p>Author: {postDetail.author}</p>
        <p>Time: {new Date(postDetail.timestamp).toString()} </p>
        <p>Vote Score: {postDetail.voteScore}</p>
        <h3>Comments</h3>
        <ul>
          {orderedComments.map((comment) =>
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p>Author: {comment.author} </p>
              <p>Time: {new Date(comment.timestamp).toString()} </p>
              <p>Vote Score: {comment.author} </p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const postId = get(routerParams, 'match.params.id');
  const orderedComments = orderBy(state.comments, 'voteScore', ['desc']);
  // const orderedComments = orderBy(state.comments, state.sortByKey.value, ['desc']);

  return {
    state,
    postId,
    orderedComments
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
