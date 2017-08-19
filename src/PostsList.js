import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                { category.name === visibleCategory ?
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
        <Link to="/post/new">Add Post</Link>
      </div>
    )
  }
};

export default PostsList;
