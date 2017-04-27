/**
 * Created by xdj on 2017/4/25.
 */
import {
  ADD_MD_ERROR, ADD_MD_INPUT_CHANGE,
  ADD_MD_NAME_IS_NULL,
  ADD_MD_OPEN_CHANGE, ADD_MD_PROJECT_IS_NULL, ADD_MD_RECEIVE, ADD_MD_REQUEST
} from '../constants/ActionTypes'

/*
 {
 open, disable, nameErrorMsg, pwdErrorMsg, proErrorMsg, btnText,
 progressStyle,
 onDialogClose, onInputChange
 }
 */
const style = {
  progressNone: {
    backgroundColor: '#00bcd4', display: 'none'
  },
  progress: {
    backgroundColor: '#00bcd4', display: 'block'
  }
};

const addMdDialog = function (state = {open: false, btnText: "保存", progressStyle: style.progressNone}, action) {
  const payload = action.payload;

  switch (action.type) {
    case ADD_MD_OPEN_CHANGE:
      return {
        ...state,
        open: action.payload.open,
        disable: false,
        modal: false,
        progressStyle: style.progressNone,
        nameErrorMsg: undefined,
        pwdErrorMsg: undefined,
      };
    case ADD_MD_NAME_IS_NULL:
      return {...state, nameErrorMsg: "文档名不能为空"};
    case ADD_MD_PROJECT_IS_NULL:
      return {...state, proErrorMsg: "项目名不能为空"};
    // case ADD_MD_PWD_IS_NULL:
    //   return {...state, pwdErrorMsg: "密码不能为空"};
    case ADD_MD_REQUEST:
      return {
        ...state,
        modal: true,
        disable: true,
        progressStyle: style.progress,
        usedProName: payload.usedProName, // 用于记录最近新建文档使用的项目
      };
    case ADD_MD_RECEIVE:
      if (action.payload.code === 0) {
        return {
          ...state,
          open: false,
          progressStyle: style.progressNone,
        };
      }
      return {
        ...state,
        modal: false,
        disable: false,
        pwdErrorMsg: payload.msg,
        progressStyle: style.progressNone,
      };
    case ADD_MD_ERROR:
      return {
        ...state,
        modal: false,
        disable: false,
        nameErrorMsg: "保存发生错误",
        progressStyle: style.progressNone,
      };
      return;
    case ADD_MD_INPUT_CHANGE:
      return {
        ...state,
        nameErrorMsg: undefined,
        pwdErrorMsg: undefined,
      };
    default:
      return state;
  }
};

export default addMdDialog;