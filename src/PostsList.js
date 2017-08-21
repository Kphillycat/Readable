import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';

class PostsList extends Component {
  render() {
    console.log('=== PostsList props ', this.props);

    const { categories, visibleCategory, posts } = this.props;

    return (
      <div>
        {/* List categories */}
        <Link to="/">HOME</Link>
        <div>
          <ul>
            {categories.map((category) =>
              <li key={category.path}>
                {
                  category.name === visibleCategory ?
                  <span>{category.name}</span>
                    :
                  <Link to={`/category/${category.path}`} onClick={this.onClickHandle}>{category.name}, </Link>
                }

                </li>
              )
            }
          </ul>
        </div>
        {/* List Posts */}
        <div>
          {posts.map((post) =>
            <PostPreview key={post.id} post={post} />
          )}
        </div>
        {/* Add Post */}
        <Link to="/post/new">Add Post</Link>
      </div>
    )
  }
};

export default PostsList;