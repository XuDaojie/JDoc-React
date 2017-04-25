/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_OPEN_CHANGE, LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_ERROR, LOGIN_INPUT_CHANGE,
  LOGIN_USER_IS_NULL, LOGIN_PWD_IS_NULL
} from '../constants/ActionTypes';
import $ from 'jquery';
import * as tokenUtil from '../utils/tokenUtil';
import * as Api from "../constants/Api";

export const loginOpenChange = function (open) {
  return {
    type: LOGIN_OPEN_CHANGE,
    payload: {openLogin: open},
  }
};

const loginReceive = function (result) {
  return {type: LOGIN_RECEIVE, payload: result};
};

const loginError = function () {
  return {type: LOGIN_ERROR}
};

export const login = function (username, password) {
  if(username.length === 0) {
    return {
      type: LOGIN_USER_IS_NULL,
    }
  } else if (password.length === 0) {
    return {
      type: LOGIN_PWD_IS_NULL,
    }
  }
  return function (dispatch, getState) {
    dispatch({type: LOGIN_REQUEST});

    const sJWT = tokenUtil.create({username, password});
    $.ajax({
      url: Api.ACCOUNT,
      headers: {"X-Access-Token": sJWT},
      success: function (result, jqXHR) {
        dispatch(loginReceive(result));
      },
      error: function (jqXHR, status, errorThrown) {
        dispatch(loginError());
      },
    })
  };
};

export const inputChange = function () {
  return {type: LOGIN_INPUT_CHANGE}
};