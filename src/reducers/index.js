/**
 * Created by xdj on 2017/4/23.
 */
import { combineReducers } from 'redux'
import loginDialog from "./loginDialog";
import md from "./md";
import addMdDialog from "./addMdDialog";
import main from "./main";
import nav from "./nav";
import appBar from "./appBar";
import sharedDialog from "./sharedDialog";
import registerDialog from "./registerDialog";

const reducerIndex = combineReducers ({
  appBar,
  main,
  loginDialog,
  registerDialog,
  sharedDialog,
  md,
  addMdDialog,
  nav,
});

export default reducerIndex;
