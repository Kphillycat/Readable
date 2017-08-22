import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm.js';
import * as actions from './actions';
import { withRouter } from 'react-router';

class PostFormContainer extends Component{
  handleSubmit = (form) => {
    // TODO map dispatch to props
    console.log('===== formType', this.props.formType);
    console.log('===== form', form);
    if(this.props.formType === 'edit') {
      this.props.dispatch(actions.editPost(form));
    } else {
      this.props.dispatch(actions.addPost(form));
    }
    // Redirect to main page on submit
    this.props.history.push("/");
  }

  render(){
    console.log('=== PostFormContainer ', this.props);
    const { formType } = this.props;
    const { categories, formData } = this.props.state;
    return(
      <PostForm categories={categories} handleSubmit={this.handleSubmit} formData={formData} formType={formType}/>
    )
  }
}

function mapStateToProps(state, routerParams) {
  console.log('===== Router Params ', routerParams);
  const formType = routerParams.match.path.includes('edit') ? 'edit' : 'new'
  return {
    state,
    formType
  };
}

export default withRouter(connect(mapStateToProps)(PostFormContainer));
