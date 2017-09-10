import React, { Component } from 'react';
import { v4 } from 'uuid';
import every from 'lodash.every';
import isEmpty from 'lodash.isempty';

class CommentForm extends Component {
  state = {
    id: '',
    parentId: '',
    body: '',
    author: ''
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
    let form = this.state;
    form.id = this.props.formData.id || v4();
    form.parentId = this.props.formData.parentId || this.props.parentId;
    form.timestamp = Date.now();
    if(every(form)) {
      this.props.handleSubmit(form);
      this.setState({
        id: '',
        parentId: '',
        body: '',
        author: ''
      });
    }
  }

  handleOnChange = (event) => {
    const {value: fieldValue, id: field} = event.target;
    let form = {};
    form[field] = fieldValue;
    this.setState(
      form
    );
  }

  render() {
    const { formType } = this.props;

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="body">Body</label>
          <input type="textarea" id="body"
            value={this.state.body}
            onChange={(e) => this.handleOnChange(e)}
            ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="author">Author</label>
          <input type="text" id="author"
            value={this.state.author}
            onChange={(e) => this.handleOnChange(e)}
            ></input>
        </fieldset>
        <button>{formType} Comment</button>
      </form>
      </div>
    );
  }
}

export default CommentForm;
