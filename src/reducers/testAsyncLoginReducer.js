/**
 * Created by xdj on 2017/4/23.
 */
export const testAsyncShowLoginReducer = function (state = {openLogin: false}, action) {
  // console.log("async" + state);
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

export const testAsyncLoginReducer = function (state = {text: undefined}, action) {
  return {
    ...state,
    text: action.text,
  }
};

export default testAsyncLoginReducer;