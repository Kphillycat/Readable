import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as actions from './actions';
import get from 'lodash.get';
import SortControl from './SortControl';
import { withRouter } from 'react-router';
import orderBy from 'lodash.orderby';
const DEFAULT_FILTER = 'all';

class CategoryFilteredPostsList extends Component {
  state = {
    category: DEFAULT_FILTER
  };

  componentDidMount() {
    this.props.dispatch(actions.fetchPosts(this.props.visibleCategory));
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

  render() {
    const { posts, categories, sortByKey } = this.props.state;
    const { visibleCategory } = this.props;
    console.log('=========  ============ this.props', this.props);
    return (
      <div>
        <SortControl sortByKey={sortByKey.value} handleOnChange={this.handleSortOnChange} />
        <PostsList visibleCategory={visibleCategory} posts={posts.sortedPosts} categories={categories} />
      </div>
    );
  }
};

function mapStateToProps(state, routerParams) {
  const visibleCategory = get(routerParams, 'match.params.categoryPath', DEFAULT_FILTER);
  const orderedPosts = orderBy(state.posts.postsById, state.sortByKey.value, ['desc']);

  return {
    state,
    visibleCategory,
    orderedPosts
  }
}

export default withRouter(connect(mapStateToProps)(CategoryFilteredPostsList));