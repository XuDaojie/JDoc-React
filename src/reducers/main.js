/**
 * Created by xdj on 2017/4/26.
 */
import {
  INIT,
  LOGIN_RECEIVE,
  MAIN_LOAD_HTML_REQUEST,
  MAIN_MSG_CLOSE,
  MAIN_MSG_OPEN,
  NOT_LOGIN
} from '../constants/ActionTypes';
import * as actionTypes from '../constants/ActionTypes';

const style = {
  fab: {marginRight: 16, position: 'fixed', right: 64, bottom: 64},
  fabNone: {marginRight: 16, position: 'fixed', right: 64, bottom: 64, display: 'none'}
};

// initParams location.href 上的参数
const main = function (state = {
  initParams: [],
  readMdId: 1,
  msgOpen: false,
  fabStyle: style.fabNone
}, action) {
  const payload = action.payload;

  switch (action.type) {
    case INIT:
      if (payload.isShared) {
        return {
          ...state,
          initParams: payload.initParams,
          readMdId: payload.readMdId,
        };
      } else {
      }
      return state;
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        readMdId: 1,
      };
    case NOT_LOGIN:
      return {
        ...state,
        msg: "账号未登陆",
      };
    case LOGIN_RECEIVE:
      if (payload.code === 0) {
        return {
          ...state,
          fabStyle: style.fab,
        };
      }
      return {
        ...state,
        fabStyle: style.fabNone,
      };
    case MAIN_MSG_OPEN:
      return {
        ...state,
        msgOpen: true,
        msg: payload.msg,
      };
    case MAIN_MSG_CLOSE:
      return {
        ...state,
        msgOpen: false,
        msg: undefined,
      };
    case MAIN_LOAD_HTML_REQUEST:
      return {
        ...state,
        readMdId: payload.readMdId,
      };
    default:
      return state;
  }
};

export default main;
