import React, { Component } from 'react';
import { v4 } from 'uuid';
import every from 'lodash.every';
import isEmpty from 'lodash.isempty';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import omit from 'lodash.omit';
import RaisedButton from 'material-ui/RaisedButton';
const errorText = 'This field is required';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    errorText: ''
  }

  componentDidMount(){
    const { formData } = this.props;
    if(isEmpty(formData)) return;
    this.setState({
      title: formData.title,
      body: formData.body,
      author: formData.author,
      category: formData.category,
      id: formData.id
    });
  }

  createNewPost = (event) => {
    event.preventDefault();
    const form = omit(this.state, 'errorText');
    form.id = form.id || v4();
    form.timestamp = Date.now();
    // Check that form is filled out completely
    if(every(form)) {
      this.props.handleSubmit(form);
    } else {
      this.setState({
        errorText
      });
    }
  }

  handleTextChange(event) {
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

  handleSelectChange = (event, index, value) => {
    if(value === '') {
      this.setState({
        category: value,
        errorText
      });
    } else {
      this.setState({
        category: value,
        errorText: ''
      });
    }
  }

  render() {
    const { categories, formType } = this.props;
    return (
      <div>
        <form onSubmit={this.createNewPost}>
        <fieldset>
          <TextField
            hintText="Post Title"
            floatingLabelText="Post Title"
            id="title"
            value={this.state.title}
            errorText={!this.state.title && this.state.errorText}
            onChange={(e) => this.handleTextChange(e)}
          />

        </fieldset>
        <fieldset>
          <TextField
            hintText="Post Body"
            floatingLabelText="Post Body"
            id="body"
            multiLine={true}
            fullWidth={true}
            value={this.state.body}
            errorText={!this.state.body && this.state.errorText}
            onChange={(e) => this.handleTextChange(e)}
          />

        </fieldset>
        <fieldset>
          <TextField
            hintText="Post Author"
            floatingLabelText="Post Author"
            id="author"
            value={this.state.author}
            errorText={!this.state.author && this.state.errorText}
            onChange={(e) => this.handleTextChange(e)}
          />
        </fieldset>
        <fieldset>
          <SelectField
            style={{"textTransform": "capitalize"}}
            floatingLabelText="Category"
            name="category"
            id="category"
            errorText={!this.state.category && this.state.errorText}
            value={this.state.category}
            onChange={this.handleSelectChange}
          >
            {categories.map((category, index) =>
              <MenuItem
                style={{"textTransform": "capitalize"}}
                key={index}
                value={category.name}
                primaryText={category.name} />
            )}
          </SelectField>
        </fieldset>

        <RaisedButton
          style={{"marginTop": "15px"}}
          label={`${formType} Post`}
          primary={true}
          onClick={this.createNewPost}
          />
        </form>
      </div>
    );
  }
}

export default PostForm;
