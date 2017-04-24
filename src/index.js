import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import TestApp from "./components/TestApp";
import TestApp from "./components/TestAsyncApp";

import './index.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <TestApp/>
  </Provider>,
  document.getElementById('root')
);
