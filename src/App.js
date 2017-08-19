import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import CategoryFilteredPostsList from './CategoryFilteredPostsList.js';
import PostForm from './PostForm.js';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  handleSubmit = (form) => {
    this.props.dispatch(actions.addPost(form));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={CategoryFilteredPostsList} />
          <Route path="/category/:categoryPath" render={() => <CategoryFilteredPostsList/>} />
          <Route path="/post/new" handleSubmit={this.handleSubmit} categories={this.props.state.categories} component={PostForm} />
        </div>
      </BrowserRouter>

    );
  }
}

function mapStateToProps(state) {
  return {
    state
  }
};

export default connect(mapStateToProps)(App);
