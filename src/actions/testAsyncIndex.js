/**
 * Created by xdj on 2017/4/23.
 */
import $ from 'jquery/dist/jquery.min';

export const SHOW_LOGIN = "SHOW_LOGIN";
export const CLOSE_LOGIN = "CLOSE_LOGIN";
export const TEST_ASYNC = "TEST_ASYNC";
export const LOGIN = "LOGIN";
export const REQUEST_LOGIN_POSTS = "REQUEST_LOGIN_POSTS";
export const RECEIVE_LOGIN_POSTS = "LOGIN";

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

export const test = function (text) {
  return {
    type:TEST_ASYNC,
    text,
  };
};

export const testAsync = function (text) {
  // return dispatch => {
  //   setTimeout(() => {
  //     // Yay! Can invoke sync or async actions with `dispatch`
  //     dispatch(test(text));
  //   }, 3000);
  // };

  return function (dispatch) {
    $.ajax({
      url: "http://localhost:8080/JDoc/login.do",
      data: {
        username: "jdoc",
        password: "jdoc1",
      },
      headers: {
      },
      success: function (result) {
        // console.log(result);
        dispatch(test(result));
      },
      error: function (jqXHR, status, errorThrown) {
        // console.log(status);
        dispatch(test(status));
      }
    });
  }
};

export const login = function (username, password) {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  }
};

export const loginRequestPost = function (username, password) {
  return {
    type: REQUEST_LOGIN_POSTS,
    payload: {
      username,
      password
    }
  }
};

export const loginRecivePost = function (subreddit, json) {

  return {
    type: RECEIVE_LOGIN_POSTS,
  }
};



