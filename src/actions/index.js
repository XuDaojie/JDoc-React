/**
 * Created by xdj on 2017/4/23.
 */
import $ from 'jquery';

export const SHOW_LOGIN = "SHOW_LOGIN";
export const CLOSE_LOGIN = "CLOSE_LOGIN";
export const LOGIN = "LOGIN";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

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

export const loginSuccess = function (result) {
  return {
    type: LOGIN_SUCCESS,
    payload: result,
  };
};

export const loginError = function (result) {
  return {
    type: LOGIN_ERROR,
    payload: {
      msg: result,
    },
  }
};

export const login = function (username, password) {
  return (dispatch, getState) =>{
    dispatch({type: LOGIN_REQUEST});
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      success: function (result) {
        dispatch({type: LOGIN_SUCCESS, payload: loginSuccess(result)});
      },
      error: function (jqXHR, status, errorThrown) {
        loginError();
      },
    })
  };
};