import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import * as actions from './actions';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getPostDetail(this.props.postId))
  }

  render () {
    console.log('---- PostDetail ', this.props);
    const { postDetail } = this.props.state;
    return (
      <div>
        <h3>{postDetail.title}</h3>
        <p>{postDetail.body}</p>
        <p>Author: {postDetail.author}</p>
        <p>Time: {postDetail.timestamp}</p>
        <p>Vote Score: {postDetail.voteScore}</p>
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const postId = get(routerParams, 'match.params.id');

  return {
    state,
    postId
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
