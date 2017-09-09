import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import * as actions from './actions';
import orderBy from 'lodash.orderby';
import SortControl from './SortControl';
import Comments from './Comments';
import { v4 } from 'uuid';
import every from 'lodash.every';
import { Link } from 'react-router-dom';
import { getPostComments } from './utils';

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

  handleSortOnChange = (event) => {
    const sortByKey = event.target.value;
    this.props.dispatch(actions.sortComments(sortByKey));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form = this.state;
    form.id = v4();
    form.parentId = this.props.state.postDetail.id;
    form.timestamp = Date.now();
    if(every(form)) {
      this.props.dispatch(actions.addComment(form));
    }
  }

  handleOnChange = (event) => {
    const {value: fieldValue, id: field} = event.target;
    let form = {};
    form[field] = fieldValue;
    this.setState(
      form
    );
  }

  handleCommentVote = (voteType, commentId) => {
    this.props.dispatch(actions.voteOnComment(voteType, commentId));
  }

  handlePostVote = (event) => {
    const voteType = event.target.id;
    const postId = this.props.state.postDetail.id;
    this.props.dispatch(actions.voteOnPost(voteType, postId));
  }

  render () {
    console.log('---- PostDetail ', this.props);
    const { postDetail, sortByKey } = this.props.state;
    const { orderedComments } = this.props;
    return (
      <div>
        <Link to="/">Home</Link>
        <h3>{postDetail.title}</h3>
        <p>{postDetail.body}</p>
        <p>Author: {postDetail.author}</p>
        <p>Time: {new Date(postDetail.timestamp).toString()} </p>
        <p>Vote Score: {postDetail.voteScore}</p>
        {/** Voting **/}
        <button id="upVote" onClick={this.handlePostVote}>Up Vote</button>
        <button id="downVote" onClick={this.handlePostVote}>Down Vote</button>
        <h3>Comments</h3>
        <SortControl handleOnChange={this.handleSortOnChange} sortByKey={sortByKey.value}/>
        <Comments comments={orderedComments} handleCommentVote={this.handleCommentVote}/>
        {/** Add new comment **/}
        <h3>Add New Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="body">Body</label>
            <input type="textarea" id="body"
              value={this.state.body}
              onChange={(e) => this.handleOnChange(e)}
              ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="author">Author</label>
            <input type="text" id="author"
              value={this.state.author}
              onChange={(e) => this.handleOnChange(e)}
              ></input>
          </fieldset>
          <button>Add new Comment</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const postId = get(routerParams, 'match.params.id');
  const commentsByPostId = getPostComments(state.comments, postId);
  const orderedComments = orderBy(commentsByPostId, state.sortByKey.value, ['desc']);
  return {
    state,
    postId,
    orderedComments
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail));
