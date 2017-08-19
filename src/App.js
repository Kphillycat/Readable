import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import CategoryFilteredPostsList from './CategoryFilteredPostsList.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={CategoryFilteredPostsList} />
        <Route path="/category/:categoryPath" component={CategoryFilteredPostsList} />
      </div>
    );
  }
}

export default App;
