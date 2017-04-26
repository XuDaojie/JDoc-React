/**
 * Created by xdj on 2017/4/26.
 */
import {
  MAIN_MSG_CLOSE,
  MAIN_MSG_OPEN,
  NOT_LOGIN
} from '../constants/ActionTypes';

const main = function (state = {msgOpen: false}, action) {
  const payload = action.payload;

  switch (action.type) {
    case NOT_LOGIN:
      if(payload.code === 0) {
        return {
          msg: "账号未登陆",
        };
      }
    case MAIN_MSG_OPEN:
      return {
        msgOpen: true,
        msg: payload.msg,
      };
    case MAIN_MSG_CLOSE:
      return {
        msgOpen: false,
        msg: undefined,
      };
    default:
      return state;
  }
};

export default main;
