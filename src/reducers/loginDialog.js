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
    case "LOGIN_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        openLogin: !state.openLogin,
      };
    case "LOGIN_ERROR":
      console.log(action.payload);
      return {
        ...state,
        openLogin: state.openLogin,
      };
    default:
      return state;
  }
};

export default loginDialog;