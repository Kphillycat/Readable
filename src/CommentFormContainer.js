import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentForm from './CommentForm.js';
import * as actions from './actions';
import { withRouter } from 'react-router';

class CommentFormContainer extends Component {
  handleSubmit = (form) => {
    if(this.props.formType === 'Edit') {
      this.props.dispatch(actions.editComment(form, form.id));
      // Redirect to main page on submit
      this.props.history.push(`/post/view/${form.parentId}`);
    } else {
      this.props.dispatch(actions.addComment(form));
    }
  }

  render(){
    const { formType, parentId } = this.props;
    const { formData } = this.props.state;
    return(
      <div>
        <h3>{formType} Comment</h3>
          <CommentForm
            handleSubmit={this.handleSubmit}
            formData={formData}
            formType={formType}
            parentId={parentId}
            />
      </div>
    )
  }
}

function mapStateToProps(state, routerParams) {
  const formType = routerParams.match.path.includes('edit') ? 'Edit' : 'New'
  return {
    state,
    formType
  };
}

export default withRouter(connect(mapStateToProps)(CommentFormContainer));
