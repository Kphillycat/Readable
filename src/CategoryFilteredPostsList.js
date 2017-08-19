import React, { Component } from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import * as actions from './actions';
import get from 'lodash.get';
const DEFAULT_FILTER = 'all';

class CategoryFilteredPostsList extends Component {
  state = {
    category: DEFAULT_FILTER
  };

  componentDidMount() {
    this.props.dispatch(actions.fetchPosts());
    this.setState({
      category: get(this.props, 'match.params.categoryPath', DEFAULT_FILTER)
    });
  }

  componentWillUpdate(prevProps) {
    const nextCategory = get(prevProps, 'match.params.categoryPath', DEFAULT_FILTER);
    if(nextCategory !== this.state.category) {
      console.log('====== CALLING FETCH for category ', nextCategory);
      this.props.dispatch(actions.fetchPostsByCategory(nextCategory));
      this.setState({
        category: nextCategory
      });
    }
  }

  render() {
    const { category } = this.state;
    const { posts, categories } = this.props.state;
    console.log('CategoryFilteredPostsList posts => ', posts);
    console.log('CategoryFilteredPostsList  category => ', category);
    return (
      <PostsList category={category} posts={posts} categories={categories}/>
    );
  }
};

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(CategoryFilteredPostsList);
