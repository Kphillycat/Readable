import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import * as actions from './actions';
import orderBy from 'lodash.orderby';
import SortControl from './SortControl';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getPostDetail(this.props.postId));
    this.props.dispatch(actions.fetchComments(this.props.postId));
  }

  handleSortOnChange = (event) => {
    const sortByKey = event.target.value;
    this.props.dispatch(actions.sortComments(sortByKey));
  }

  render () {
    console.log('---- PostDetail ', this.props);
    const { postDetail, sortByKey } = this.props.state;
    const { orderedComments } = this.props;
    return (
      <div>
        <h3>{postDetail.title}</h3>
        <p>{postDetail.body}</p>
        <p>Author: {postDetail.author}</p>
        <p>Time: {new Date(postDetail.timestamp).toString()} </p>
        <p>Vote Score: {postDetail.voteScore}</p>
        <h3>Comments</h3>
        <SortControl handleOnChange={this.handleSortOnChange} sortByKey={sortByKey}/>
        <ul>
          {orderedComments.map((comment) =>
            <li key={comment.id} style={{
                listStyleType: "none",
                border: "solid black 1px"
              }}>
              <p>Body: {comment.body}</p>
              <p>Author: {comment.author} </p>
              <p>Time: {new Date(comment.timestamp).toString()} </p>
              <p>Vote Score: {comment.voteScore} </p>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const postId = get(routerParams, 'match.params.id');
  const orderedComments = orderBy(state.comments, state.sortByKey.value, ['desc']);
  return {
    state,
    postId,
    orderedComments
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
