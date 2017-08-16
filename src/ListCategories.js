import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListCategories extends Component {
  render() {
    console.log('this.props ',  this.props)
    const { state } = this.props;
    return (
      <div>
        <p>
          {state.Categories.map((category) => <span><a key={category.path} href="#">{category.name}</a></span> )}
        </p>
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
