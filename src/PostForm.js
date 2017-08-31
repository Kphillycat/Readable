import React, { Component } from 'react';
import { v4 } from 'uuid';
import every from 'lodash.every';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  componentDidMount(){
    const { formData } = this.props;
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
    const form = this.state;
    form.id = form.id || v4();
    form.timestamp = Date.now();
    // Check that form is filled out completely
    if(every(form)) {
      this.props.handleSubmit(form);
    }
  }

  handleChange(event) {
    const {value: fieldValue, id: field} = event.target;
    let form = {};
    form[field] = fieldValue;
    this.setState(
      form
    );
  }

  render() {
    const { categories, formType } = this.props;

    return (
      <div>
        <form onSubmit={this.createNewPost}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Post Title" name="title" id="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
            >
          </input>
        </fieldset>
        <fieldset>
          <label htmlFor="body">Body</label>
          <input type="textarea" placeholder="Post Body" name="body" id="body"
            value={this.state.body}
            onChange={(e) => this.handleChange(e)}
          >
          </input>
        </fieldset>
        <fieldset>
          <label htmlFor="author">Author</label>
          <input type="text" placeholder="Post Author" name="author" id="author"
            value={this.state.author}
            onChange={(e) => this.handleChange(e)}
            >
          </input>
        </fieldset>
        <fieldset>
          <label htmlFor="category">Category</label>
          <select name="category"
            id="category"
            value={this.state.category}
            onChange={(e) => this.handleChange(e)}
            >
            <option value="">Please Select Category...</option>
            {categories.map((category) =>
              <option key={category.name} value={category.name}>{category.name}</option>
            )};
          </select>
        </fieldset>

        <button>{formType} Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
