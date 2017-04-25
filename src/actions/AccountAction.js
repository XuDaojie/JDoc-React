/**
 * Created by xdj on 2017/4/25.
 */
import {
  LOGIN_SUCCESS, LOGIN_ERROR,
  LOGIN_REQUEST
} from '../constants/ActionTypes';
import $ from 'jquery/dist/jquery.min';
import {ACCOUNT} from "../constants/Api";
import TokenUtil from "../utils/TokenUtil";

const receiveLogin = function(result) {
  if(result.code === 0) {
    // todo Drawer列表加载数据
  } else {

  }
};

const errorLogin = function () {
};

export const login = function (username, password) {
  return function (dispatch, getState) {
    dispatch({type: LOGIN_REQUEST});
    const sJWT = TokenUtil.create({username, password});
    $.ajax({
      url: ACCOUNT,
      headers: {"X-Access-Token": sJWT},
      success: function (result) {
        dispatch({type: LOGIN_SUCCESS, payload: receiveLogin(result)});
      },
      error: function (jqXHR, status, errorThrown) {

      },
    })
  }
};



