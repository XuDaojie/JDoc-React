/**
 * Created by xdj on 2017/4/23.
 */
const loginDialog = function (state = {openLogin: false}, action) {
  switch (action.type) {
    case "SHOW_LOGIN":
      return {
        ...state,
        openLogin: !state.openLogin,
      };
    case "CLOSE_LOGIN":
      return {
        ...state,
        openLogin: !state.openLogin,
      };
    case "LOGIN":
      if (!action.payload.username || !action.payload.password
        || action.payload.username.length === 0
        || action.payload.password.length === 0) {
        return state;
      }
      return {
        ...state,
        openLogin: !state.openLogin,
      };
    default:
      return state;
  }
};

export default loginDialog;