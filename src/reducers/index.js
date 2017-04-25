/**
 * Created by xdj on 2017/4/23.
 */
import { combineReducers } from 'redux'
import testLoginReducer from './testLoginReducer';
import testAsyncLoginReducer from './testAsyncLoginReducer'
import appBar from "./appBar";

const testReducer = combineReducers ({
  // testLoginReducer,
  // testAsyncLoginReducer,
  appBar,
});

export default testReducer;
