import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm.js';
import * as actions from './actions';

class PostFormContainer extends Component{
  handleSubmit = (form) => {
    this.props.dispatch(actions.addPost(form));
    // Redirect to main page on submit
    this.props.history.history.push("/");
  }

  render(){
    const { categories } = this.props.state;
    return(
      <PostForm categories={categories} handleSubmit={this.handleSubmit} />
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(PostFormContainer);
