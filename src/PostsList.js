import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';
import { getNumberOfCommentsOfPost } from './utils';
import RaisedButton from 'material-ui/RaisedButton';
import Add from 'material-ui/svg-icons/content/add';


class PostsList extends Component {
  render() {
    const { categories, visibleCategory, posts, handleEdit, handleVote, handleDelete, comments} = this.props;
    return (
      <div>
        {/* List categories */}
        <div>
          <ul style={{
              "listStyleType": "none",
              "textAlign": "center"
          }}>
            {categories.map((category, index) =>
              <li style={{ "display": "inline"}} key={category.path}>
                {
                  category.name === visibleCategory ?
                    <span>{category.name}</span>
                      :
                    <Link to={`/category/${category.path}`} >{category.name}</Link>
                }
                {/* Append a | after each element except the last */}
                {categories[index + 1] ? ' | ' : ''}
                </li>

              )
            }
          </ul>
        </div>
        {/* List Posts */}
        <h2>Posts</h2>
        <div>
          {posts.map((post) =>
            <PostPreview
              key={post.id}
              post={post}
              handleEdit={handleEdit}
              handleVote={handleVote}
              handleDelete={handleDelete}
              commentNumbers={getNumberOfCommentsOfPost(comments, post.id)}/>
          )}
        </div>
        {/* Add Post */}
        <RaisedButton
          icon={<Add />}
          containerElement={<Link to="/post/new" />}
          label="Add New Post"
          labelPosition="before"
          primary={true}
          style={{"marginTop": "15px"}}
          />
      </div>
    )
  }
};

export default PostsList;
