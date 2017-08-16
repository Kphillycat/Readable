import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import orderBy from 'lodash.orderby';

class ListCategories extends Component {
  state = {
    sortedPosts: []
  };

  componentDidMount(){
    this.setState({
      sortedPosts: orderBy(this.props.state.Posts, ['voteScore'], ['desc'])
    });
  }

  render() {
    console.log('this.props ',  this.props)
    const { Categories, Posts, Comments } = this.props.state;
    const { sortedPosts } = this.state;

    return (
      <div>
        {/* Sort Control */}
        <select name="sort-order" value="voteScore" onChange={(e) => {console.log(e.target.value)}}>
          <option value="voteScore">Vote Score</option>
          <option value="timeStamp">Time</option>
        </select>

        {/* List categories */}
        <div>
          <ul>
            {Categories.map((category) =>
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
            </div>

          )}
        </div>
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
