/**
 * Created by xdj on 2017/4/23.
 */
import { combineReducers } from 'redux'
import testLoginReducer from './testLoginReducer';
import testAsyncLoginReducer from './testAsyncLoginReducer'

const testReducer = combineReducers ({
  // testLoginReducer,
  testAsyncLoginReducer,
});

export default testReducer;
