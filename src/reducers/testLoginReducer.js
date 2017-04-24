/**
 * Created by xdj on 2017/4/23.
 */
const testLoginReducer = function (state={openLogin: false}, action) {
  console.log(state);
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
    default:
      return state;
  }
};

export default testLoginReducer;