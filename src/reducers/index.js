/**
 * Created by xdj on 2017/4/23.
 */
import { combineReducers } from 'redux'
import loginDialog from "./loginDialog";
import main from "./main";

const reducerIndex = combineReducers ({
  loginDialog,
  main,
});

export default reducerIndex;
