import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { categories, posts, comments } from './reducers/index.js';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({categories, posts, comments});

let store = createStore(rootReducer);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
