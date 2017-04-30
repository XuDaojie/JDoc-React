import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const preloadedState = JSON.parse(localStorage.getItem("state"));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = preloadedState !== null
  ? createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(thunk)))
  : createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   // applyMiddleware(thunk)
// );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
