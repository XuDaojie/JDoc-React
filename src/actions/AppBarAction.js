/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_OPEN_CHANGE,
} from '../constants/ActionTypes';

export const loginOpenChange = function (open) {
  return {
    type: LOGIN_OPEN_CHANGE,
    payload: {openLogin: open},
  }
};

