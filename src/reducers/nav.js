/**
 * Created by xdj on 2017/4/26.
 */
import * as actionType from '../constants/ActionTypes';

const nav = function (state = {open: false, docked: false, data: []}, action) {
  const payload = action.payload;

  switch (action.type) {
    case actionType.NAV_DOCKED_CHANGE:
      return {
        ...state,
        docked: payload.docked,
      };
    case actionType.NAV_OPEN_CHANGE:
      return {
        ...state,
        open: payload.open,
      };
    case actionType.NAV_LOAD_RECEIVE:
      return {
        ...state,
        data: payload.data
      };
    default:
      return state;
  }
};

export default nav;
