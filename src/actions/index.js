/**
 * Created by xdj on 2017/4/25.
 */
import {
  MAIN_MSG_OPEN, MAIN_MSG_CLOSE,
  LOGIN_OPEN_CHANGE, LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_ERROR, LOGIN_INPUT_CHANGE,
  LOGIN_USER_IS_NULL, LOGIN_PWD_IS_NULL,
  MAIN_LOAD_HTML_REQUEST, MAIN_LOAD_HTML_RECEIVE, MAIN_LOAD_HTML_ERROR,
  ADD_MD_OPEN_CHANGE, ADD_MD_INPUT_CHANGE, ADD_MD_NAME_IS_NULL, ADD_MD_PROJECT_IS_NULL,
  ADD_MD_REQUEST, ADD_MD_RECEIVE, ADD_MD_ERROR, NOT_LOGIN
} from '../constants/ActionTypes';
import $ from 'jquery';
import * as tokenUtil from '../utils/tokenUtil';
import * as Api from "../constants/Api";


// ---login-
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
    const auth = btoa(`${username}:${password}`);
    $.ajax({
      url: Api.ACCOUNT,
      headers: {"Authorization": `Basic ${auth}`},
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

//--------Main--------
export const mainMsgOpen = function (msg) {
  return {
    type: MAIN_MSG_OPEN,
    payload: {msg},
  }
};

export const mainMsgClose = function (open) {
  return {
    type: MAIN_MSG_CLOSE,
    payload: {},
  }
};

const mainLoadHtmlReceive = function (result) {
  return {
    type: MAIN_LOAD_HTML_RECEIVE,
    payload: result,
  };
};

const mainLoadHtmlError = function () {
  return {
    type: MAIN_LOAD_HTML_ERROR,
  };
};

export const mainLoadHtml = function () {
  return function (dispatch, getState) {
    const markdownId = getState().main.readMdId;

    dispatch({type: MAIN_LOAD_HTML_REQUEST});
    $.ajax({
      url: Api.BASE_URL + `markdown/${markdownId}`,
      headers: {"X-Access-Token": ''},
      success: function (result, jqXHR) {
        dispatch(mainLoadHtmlReceive(result));
      },
      error: function (jqXHR, status, errorThrown) {
        dispatch(mainLoadHtmlError());
      },
    });
  };

  // return {type: MAIN_LOAD_HTML, payload: {markdown_id}}
};

export const editMdOnClick = function () {
  return function (dispatch, getState) {
    const readMdId = getState().main.readMdId;
    const account = getState().loginDialog.account;
    if (!account) {
      dispatch({type: NOT_LOGIN});
      return;
    } {
      const token = getState().loginDialog.token;
      const userId = account.id;
      // window.open(Api.BASE_URL + `editormd.form?id=${readMdId}`);
      window.open(Api.BASE_URL + `static/editormd.html?it=${token}&user_id=${userId}&markdown_id=${readMdId}&`);
    }

  }
};

//----AddMarkdownDialog
export const addMdOpenChange = function (open) {
  return {
    type: ADD_MD_OPEN_CHANGE,
    payload: {open: open},
  }
};

export const addMdInputChange = function () {
  return {type: ADD_MD_INPUT_CHANGE}
};

const addMDReceive = function (result) {
  return {
    type: ADD_MD_RECEIVE,
    payload: result,
  };
};

const addMDError = function () {
  return {
    type: ADD_MD_ERROR,
  };
};

export const addMD = function (mdName, mdDes, proName) {
  if(mdName.length === 0) {
    return {type: ADD_MD_NAME_IS_NULL,}
  } else if (proName.length === 0) {
    return {type: ADD_MD_PROJECT_IS_NULL,}
  }

  return function (dispatch, getState) {
    const account = getState().loginDialog.account;
    if(!account) {

      dispatch(mainMsgOpen("账号未登录"));
      return;
    }

    dispatch({type: ADD_MD_REQUEST});
    const userId = account.id;
    if(!userId) {
      return {
        type: NOT_LOGIN
      }
    }
    const sJWT = tokenUtil.create({
      user_id: userId,
      project_name: proName,
      name: mdName,
      content: undefined,
      description: mdDes,
    });
    $.ajax({
      url: Api.BASE_URL + `markdown`,
      type: 'POST',
      headers: {"X-Access-Token": sJWT},
      success: function (result, jqXHR) {
        dispatch(addMDReceive(result));
      },
      error: function (jqXHR, status, errorThrown) {
        dispatch(addMDError());
      },
    });
  }
};