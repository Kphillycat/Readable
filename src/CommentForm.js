import React, { Component } from 'react';
import { v4 } from 'uuid';
import every from 'lodash.every';
import isEmpty from 'lodash.isempty';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import omit from 'lodash.omit';
import { REQUIRED_FIELD_ERROR as errorText }  from './constants.js';

class CommentForm extends Component {
  state = {
    id: '',
    parentId: '',
    body: '',
    author: '',
    errorText: ''
  }

  componentDidMount(){
    const { formData, formType } = this.props;
    if(isEmpty(formData) || formType !== 'Edit') return;
    this.setState({
      id: formData.id,
      parentId: formData.parentId,
      body: formData.body,
      author: formData.author
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let form = omit(this.state, 'errorText');
    form.id = this.props.formData.id || v4();
    form.parentId = this.props.formData.parentId || this.props.parentId;
    form.timestamp = Date.now();
    if(every(form)) {
      this.props.handleSubmit(form);
      this.setState({
        id: '',
        parentId: '',
        body: '',
        author: '',
        errorText: ''
      });
    }
  }

  handleOnChange = (event) => {
    const {value: fieldValue, id: field} = event.target;
    if(fieldValue === '') {
      this.setState({
        [field]: fieldValue,
        errorText
      });
    } else {
      this.setState({
        [field]: fieldValue,
        errorText: ''
      });
    }
  }

  render() {
    return (
      <div>
      <form style={{
          "border": "solid black 1px"
        }}>
        {/* Comment Body */}
        <TextField
          hintText="Comment"
          floatingLabelText="Add Comment"
          id="body"
          multiLine={true}
          fullWidth={true}
          value={this.state.body}
          errorText={!this.state.body && this.state.errorText}
          onChange={(e) => this.handleOnChange(e)}
          />
        {/* Comment Author */}
        <TextField
          hintText="Name"
          floatingLabelText="Commenter Name"
          id="author"
          value={this.state.author}
          errorText={!this.state.author && this.state.errorText}
          onChange={(e) => this.handleOnChange(e)}
          />
        <br />
        <RaisedButton
          label="Submit"
          onClick={this.handleSubmit}
          labelPosition="before"
          primary={true}
          style={{"margin": "15px"}}
          />
      </form>
      </div>
    );
  }
}

export default CommentForm;
