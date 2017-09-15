import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { categories, posts, postsByCategories, comments, sortByKey, formData, postDetail } from './reducers/index.js';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const rootReducer = combineReducers({categories, posts, postsByCategories, comments, sortByKey, formData, postDetail});
let middlewares = [thunk];
if(process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

let store = createStore(rootReducer, applyMiddleware(...middlewares));


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />      
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
