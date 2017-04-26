/**
 * Created by xdj on 2017/4/26.
 */
import {
  MAIN_MSG_CLOSE,
  MAIN_MSG_OPEN,
  NOT_LOGIN
} from '../constants/ActionTypes';

const main = function (state = {readMdId: 1, msgOpen: false,}, action) {
  const payload = action.payload;

  switch (action.type) {
    case NOT_LOGIN:
      return {
        ...state,
        msg: "账号未登陆",
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
    default:
      return state;
  }
};

export default main;
