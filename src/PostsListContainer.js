import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as actions from './actions';
import get from 'lodash.get';
import SortControl from './SortControl';
import { withRouter } from 'react-router';
import orderBy from 'lodash.orderby';
const DEFAULT_FILTER = 'all';

class PostsListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchPosts(this.props.visibleCategory));
    this.props.dispatch(actions.getCategories());
  }

  componentWillReceiveProps(nextProps) {
    const nextCategory = get(nextProps, 'match.params.categoryPath', DEFAULT_FILTER);
    if(nextCategory !== this.props.visibleCategory) {
      this.props.dispatch(actions.fetchPosts(nextCategory));
    }
  }

  handleSortOnChange = (event) => {
    const sortByKey = event.target.value;
    this.props.dispatch(actions.sortPosts(sortByKey));
  }

  handleEdit = (post) => {
    this.props.dispatch(actions.editingPost(post));
    this.props.history.push('/post/edit');
  }

  handleVote = (voteType, id) => {
    this.props.dispatch(actions.voteOnPost(voteType, id));
  }

  handleDelete = (id) => {
    this.props.dispatch(actions.deletePost(id));
  }

  render() {
    const { categories, sortByKey, comments } = this.props.state;
    const { visibleCategory, orderedPosts } = this.props;
    return (
      <div>
        <SortControl sortByKey={sortByKey.value} handleOnChange={this.handleSortOnChange} />
        <PostsList
          visibleCategory={visibleCategory}
          posts={orderedPosts}
          categories={categories}
          comments={comments}
          handleEdit={this.handleEdit}
          handleVote={this.handleVote}
          handleDelete={this.handleDelete}
          />
      </div>
    );
  }
};

function mapStateToProps(state, routerParams) {
  const visibleCategory = get(routerParams, 'match.params.categoryPath', DEFAULT_FILTER);
  let orderedPosts;
  if(visibleCategory === DEFAULT_FILTER) {
    orderedPosts = orderBy(state.posts.postsById, state.sortByKey.value, ['desc']);
  } else {
    orderedPosts = orderBy(state.postsByCategories[visibleCategory], state.sortByKey.value, ['desc']);
  }

  return {
    state,
    visibleCategory,
    orderedPosts
  }
}

export default withRouter(connect(mapStateToProps)(PostsListContainer));
