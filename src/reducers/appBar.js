/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_OPEN_CHANGE,
} from '../constants/ActionTypes'

const appBar = function (state={openLogin: false}, action) {
  switch(action.type) {
    case LOGIN_OPEN_CHANGE:
      return {
        ...state,
        openLogin: action.payload.openLogin,
      };
    default:
      return state;
  }
};

export default appBar;