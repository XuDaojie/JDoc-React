/**
 * Created by xdj on 2017/4/26.
 */
import * as actionType from '../constants/ActionTypes';

const sharedDialog = function (state = {open: false,}, action) {
  const payload = action.payload;

  switch (action.type) {
    case actionType.SHARED_OPEN_CHANGE:
      return {
        ...state,
        open: payload.open,
      };
    case actionType.MAIN_LOAD_HTML_RECEIVE:
      if (payload.code === 0) {
        return {
          ...state,
          projectUrl: payload.data.projectUrl,
          pageUrl: payload.data.pageUrl,
        };
      }
      return state;
    default:
      return state;
  }
};

export default sharedDialog;
