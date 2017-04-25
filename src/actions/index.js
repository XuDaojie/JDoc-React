/**
 * Created by xdj on 2017/4/23.
 */
export const SHOW_LOGIN = "SHOW_LOGIN";
export const CLOSE_LOGIN = "CLOSE_LOGIN";

export const showLogin = function () {
  return {
    type: SHOW_LOGIN,
  }
};

export const closeLogin = function () {
  return {
    type: CLOSE_LOGIN,
  }
};

export const loginSuccess = function () {
  return closeLogin();
};