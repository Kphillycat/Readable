import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import CategoryFilteredPostsList from './CategoryFilteredPostsList.js';
import PostFormContainer from './PostFormContainer.js';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={(history) =>
              <CategoryFilteredPostsList
                history={history}
                />
              }
            />
          <Route path="/category/:categoryPath" render={(history) =>
              <CategoryFilteredPostsList
                history={history}
                />
              }
            />
          <Route path="/post/new" render={(history) =>
              <PostFormContainer
                history={history}
                />}
          />
          <Route path="/post/edit" render={(history) =>
              <PostFormContainer
                history={history}
                />}
          />
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
