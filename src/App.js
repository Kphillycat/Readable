import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import PostsListContainer from './PostsListContainer.js';
import PostFormContainer from './PostFormContainer.js';
import PostDetail from './PostDetail.js';
import { connect } from 'react-redux';
import CommentFormContainer from './CommentFormContainer.js';
import NavMenu from './NavMenu';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavMenu />
          <Route exact path="/" render={(history) =>
              <PostsListContainer
                history={history}
                />
              }
            />
          <Route path="/category/:categoryPath" render={(history) =>
              <PostsListContainer
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
          <Route path="/post/view/:id" render={(history) =>
              <PostDetail
                history={history}
                />}
          />
          <Route path="/comment/edit" render={(history) =>
            <CommentFormContainer
              history={history}
              />}
          />
        </div>
      </BrowserRouter>

    );
  }
}

export default connect(null)(App);
