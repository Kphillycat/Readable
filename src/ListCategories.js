import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import orderBy from 'lodash.orderby';
import PostForm from './PostForm.js'
import * as actions from './actions';

class ListCategories extends Component {
  state = {
    sortedPosts: [],
    sortByKey: 'voteScore'
  };

  componentDidMount(){
    this.props.dispatch(actions.fetchPosts());
    this.orderPosts();
  }

  componentWillReceiveProps(nextProps){
    this.orderPosts(this.state.sortByKey, nextProps.state.posts);
  }

  orderPosts(byKey = this.state.sortByKey, posts = this.props.state.posts) {
    this.setState({
      sortedPosts: orderBy(posts, [byKey], ['desc']),
      sortByKey: byKey
    });
  }

  render() {
    console.log('this.props ',  this.props)
    const { categories, posts } = this.props.state;
    const { sortedPosts, sortByKey } = this.state;

    return (
      <div>
        {/* Sort Control */}
        <select name="sort-order" value={sortByKey} onChange={(e) => {this.orderPosts(e.target.value, posts)}}>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Time</option>
        </select>

        {/* List categories */}
        <div>
          <ul>
            {categories.map((category) =>
              <li key={category.path}><Link to={`/category/${category.path}`}>{category.name}, </Link></li>
              )
            }
          </ul>
        </div>
        {/* List Posts */}
        <div>
          {sortedPosts.map((post) =>
            <div key={post.id} style={
                {
                  border: "solid black 1px"
                }
              }>
              <p>
                {post.title}
              </p>
              <p>
                {post.body.substring(0,30)}
              </p>
              <p>
                Votes: {post.voteScore}
              </p>
              <p>
                Date: {new Date(post.timestamp).toString()}
              </p>
            </div>

          )}
        </div>
        {/* Add Post */}
        <PostForm categories={categories}/>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(ListCategories);
