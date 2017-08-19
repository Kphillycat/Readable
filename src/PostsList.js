import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import orderBy from 'lodash.orderby';
import PostForm from './PostForm.js'
import * as actions from './actions';

class PostsList extends Component {
  state = {
    sortedPosts: [],
    sortByKey: 'voteScore'
  };

  componentDidMount(){
    this.orderPosts();
  }

  componentWillReceiveProps(nextProps){
    this.orderPosts(this.state.sortByKey, nextProps.posts);
  }

  orderPosts(byKey = this.state.sortByKey, posts = this.props.posts) {
    this.setState({
      sortedPosts: orderBy(posts, [byKey], ['desc']),
      sortByKey: byKey
    });
  }

  handleSubmit = (form) => {
    this.props.dispatch(actions.addPost(form));
  }

  render() {
    console.log('PostsList props ',  this.props)
    const { categories, posts, category: visibleCategory } = this.props;
    const { sortedPosts, sortByKey } = this.state;

    return (
      <div>
        {/* Sort Control */}
        <select name="sort-order" value={sortByKey} onChange={(e) => {this.orderPosts(e.target.value, posts)}}>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Time</option>
        </select>

        {/* List categories */}
        <Link to="/">HOME</Link>
        <div>
          <ul>
            {categories.map((category) =>
              <li key={category.path}>
                { category.name === visibleCategory ?
                  <span>{category.name}</span>
                    :
                  <Link to={`/category/${category.path}`}>{category.name}, </Link>
                }

                </li>
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
              <p>
                Category: {post.category}
              </p>
            </div>

          )}
        </div>
        {/* Add Post */}
        <PostForm categories={categories} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
};


export default connect()(PostsList);
