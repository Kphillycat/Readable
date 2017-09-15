import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import PostsListContainer from './PostsListContainer.js';
import PostFormContainer from './PostFormContainer.js';
import PostDetail from './PostDetail.js';
import { connect } from 'react-redux';
import CommentFormContainer from './CommentFormContainer.js';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar
            title="Readable"
            iconElementLeft={
              <IconButton containerElement={<Link to="/" />}>
                <ActionHome />
              </IconButton>
            }>
            </AppBar>
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

function mapStateToProps(state) {
  return {
    state
  }
};

export default connect(mapStateToProps)(App);
