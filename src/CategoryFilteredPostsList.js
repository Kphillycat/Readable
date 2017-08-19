import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as actions from './actions';
import get from 'lodash.get';
import SortControl from './SortControl';
import { withRouter } from 'react-router';
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
    const { posts, categories, visibleCategory, sortByKey } = this.props.state;
    return (
      <div>
        <SortControl sortByKey={sortByKey.value} handleOnChange={this.handleSortOnChange} />
        <PostsList visibleCategory={visibleCategory} posts={posts} categories={categories} {...this.props}/>
      </div>
    );
  }
};

function mapStateToProps(state, routerParams) {
  const visibleCategory = get(routerParams, 'match.params.categoryPath', DEFAULT_FILTER);
  return {
    state,
    visibleCategory
  }
}

export default withRouter(connect(mapStateToProps)(CategoryFilteredPostsList));
