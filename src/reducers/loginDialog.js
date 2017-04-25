/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_OPEN_CHANGE, LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_ERROR, LOGIN_INPUT_CHANGE,
  LOGIN_USER_IS_NULL, LOGIN_PWD_IS_NULL
} from '../constants/ActionTypes'

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

const loginDialog = function (state = {btnText: "登录", progressStyle: style.progressNone}, action) {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN_OPEN_CHANGE:
      return {
        ...state,
        open: action.payload.openLogin,
        disable: false,
        modal: false,
        progressStyle: style.progressNone,
        userErrorMsg: undefined,
        pwdErrorMsg: undefined,
      };
    case LOGIN_USER_IS_NULL:
      return {...state, userErrorMsg: "用户名不能为空"};
    case LOGIN_PWD_IS_NULL:
      return {...state, pwdErrorMsg: "密码不能为空"};
    case LOGIN_REQUEST:
      return {
        ...state,
        modal: true,
        disable: true,
        progressStyle: style.progress,
      };
    case LOGIN_RECEIVE:
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
    case LOGIN_ERROR:
      return {
        ...state,
        modal: false,
        disable: false,
        pwdErrorMsg: "登录发生错误",
        progressStyle: style.progressNone,
      };
      return;
    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        userErrorMsg: undefined,
        pwdErrorMsg: undefined,
      };
    default:
      return state;
  }
};

export default loginDialog;