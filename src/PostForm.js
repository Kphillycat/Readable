import React, { Component } from 'react';

class PostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: this.props.categories[0].name
  }

  createNewPost = (event) => {
    event.preventDefault();
    console.log('form ', this.state);
  }

  handleChange(event) {
    const {value: fieldValue, id: field} = event.target;
    if(!fieldValue || !field) return;
    let form = {};
    form[field] = fieldValue;
    this.setState(
      form
    );
  }

  render() {
    const { categories } = this.props;

    return (
      <div>
        <form onSubmit={this.createNewPost}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Post Title" name="title" id="title"
            value={this.state.tile}
            onChange={(e) => this.handleChange(e)}
            >
          </input>
          <label htmlFor="body">Body</label>
          <input type="textarea" placeholder="Post Body" name="body" id="body"
            value={this.state.body}
            onChange={(e) => this.handleChange(e)}
          >
          </input>
          <label htmlFor="author">Author</label>
          <input type="text" placeholder="Post Author" name="author" id="author"
            value={this.state.author}
            onChange={(e) => this.handleChange(e)}
            >
          </input>
          <label htmlFor="category">Category</label>
          <select name="category"
            id="category"
            value={this.state.category}
            onChange={(e) => this.handleChange(e)}
            >
            {categories.map((category) =>
              <option key={category.name} value={category.name}>{category.name}</option>
            )};
          </select>
          <button>Create New Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;
