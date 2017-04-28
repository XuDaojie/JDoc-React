/**
 * Created by xdj on 2017/4/26.
 */
import * as actionType from '../constants/ActionTypes';

const style = {
  show: {color: 'white'},
  none: {display: 'none'}
};

const nav = function (state = {
  title: undefined,
  loginStyle: style.show,
  addMdStyle: style.none
}, action) {
  const payload = action.payload;

  switch (action.type) {
    case actionType.LOGIN_RECEIVE:
      if (payload.code === 0) {
        return {
          ...state,
          loginStyle: style.none,
          addMdStyle: style.show,
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default nav;
