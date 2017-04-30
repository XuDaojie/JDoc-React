/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_OPEN_CHANGE, LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_ERROR, LOGIN_INPUT_CHANGE,
  LOGIN_USER_IS_NULL, LOGIN_PWD_IS_NULL
} from '../constants/ActionTypes'
import * as actionTypes from '../constants/ActionTypes'
/*
 {
 open, disable, userErrorMsg, pwdErrorMsg, btnText,
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

const registerDialog = function (state = {open: false, btnText: "立即注册", progressStyle: style.progressNone}, action) {
  const payload = action.payload;

  switch (action.type) {
    case actionTypes.REGISTER_OPEN_CHANGE:
      return {
        ...state,
        open: payload.open,
        disable: false,
        modal: false,
        progressStyle: style.progressNone,
        userErrorMsg: undefined,
        pwdErrorMsg: undefined,
        pwdErrorMsg1: undefined,
      };
    case actionTypes.REGISTER_USER_IS_NULL:
      return {...state, userErrorMsg: "用户名不能为空"};
    case actionTypes.REGISTER_PWD_IS_NULL:
      return {...state, pwdErrorMsg: "密码不能为空"};
    case actionTypes.REGISTER_PWD1_IS_NULL:
      return {...state, pwdErrorMsg1: "确认密码不能为空"};
    case actionTypes.REGISTER_PWD_NOT_SAME:
      return {...state, pwdErrorMsg1: "两次密码不一致"};
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        modal: true,
        disable: true,
        progressStyle: style.progress,
      };
    case actionTypes.REGISTER_RECEIVE:
      if (action.payload.code === 0) {
        return {
          ...state,
          open: false,
          progressStyle: style.progressNone,
          account: payload.data,
          token: payload.token,
        };
      }
      return {
        ...state,
        modal: false,
        disable: false,
        pwdErrorMsg1: payload.msg,
        progressStyle: style.progressNone,
      };
    case actionTypes.REGISTER_WARN:
      return {
        ...state,
        modal: false,
        disable: false,
        pwdErrorMsg1: payload.msg,
        progressStyle: style.progressNone,
      };
    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        modal: false,
        disable: false,
        pwdErrorMsg1: "发生错误",
        progressStyle: style.progressNone,
      };
    case actionTypes.REGISTER_INPUT_CHANGE:
      return {
        ...state,
        userErrorMsg: undefined,
        pwdErrorMsg1: undefined,
        pwdErrorMsg: undefined,
      };
    default:
      return state;
  }
};

export default registerDialog;