/**
 * Created by xdj on 2017/4/25.
 */
import {
  MAIN_MSG_OPEN, MAIN_MSG_CLOSE,
  LOGIN_OPEN_CHANGE, LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_ERROR, LOGIN_INPUT_CHANGE,
  LOGIN_USER_IS_NULL, LOGIN_PWD_IS_NULL,
  MAIN_LOAD_HTML_REQUEST, MAIN_LOAD_HTML_RECEIVE, MAIN_LOAD_HTML_ERROR,
  ADD_MD_OPEN_CHANGE, ADD_MD_INPUT_CHANGE, ADD_MD_NAME_IS_NULL, ADD_MD_PROJECT_IS_NULL,
  ADD_MD_REQUEST, ADD_MD_RECEIVE, ADD_MD_ERROR, NOT_LOGIN,
  NAV_OPEN_CHANGE, NAV_LOAD, NAV_LOAD_REQUEST, NAV_LOAD_RECEIVE, NAV_LOAD_ERROR,
  COOMON_FETCH_ERROR
} from '../constants/ActionTypes';
import * as actionType from '../constants/ActionTypes';
import $ from 'jquery';
import * as tokenUtil from '../utils/tokenUtil';
import * as Api from "../constants/Api";

//----init----
const getUrlParam = function () {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};
export const init = function () {
  return function (dispatch, getState) {
    const markdownId = getUrlParam()["markdown_id"];
    const oldState = localStorage.getItem("state");
    let payload = {};
    if (oldState !== undefined) {
      payload = {oldState};
    }
    if (!markdownId) {
      return {type: actionType.INIT, payload: {isShared: false, initParams: []}};
    }
    return {
      type: actionType.INIT,
      payload: {isShared: true, readMdId: markdownId, initParams: getUrlParam()}
    };
  };

};
// 检查是否是分享的链接
const isShared = function () {
  // location.host

  return true;
};

// ----common
const isLogin = function (dispatch, getState) {
  if (!getState().loginDialog.account) {
    dispatch({type: NOT_LOGIN});
    return false;
  }
  return true;
};
const fetchReceive = function (result, successType) {
  if (result.code === 0) {
    return {type: successType, payload: result};
  }
  return fetchWarn(result);
};
// 接口请求成功但code为失败
const fetchWarn = function (result) {
  return {type: COOMON_FETCH_ERROR, payload: {msg: result.msg}}
};
// 比如404
const fetchError = function (msg) {
  return {type: COOMON_FETCH_ERROR, payload: {msg}}
};

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
  if (username.length === 0) {
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
        if (result.code === 0) {
          // dispatch(fetchReceive(result, LOGIN_RECEIVE));
          dispatch(loginReceive(result));
          // document.cookie = `state=${JSON.stringify(getState())}; expires=Thu, 18 Dec 2021 12:00:00 GMT`;
          localStorage.setItem("state", JSON.stringify(getState()));
          dispatch(navLoad());
        } else {
          dispatch(fetchWarn(result));
        }
      },
      error: function (jqXHR, status, errorThrown) {
        dispatch(loginError());
      },
    })
  };
};

export const inputChange = function () {
  return {type: LOGIN_INPUT_CHANGE};
};

// appBar--
export const signOut = function () {
  localStorage.removeItem("state");
  return {type: actionType.SIGN_OUT};
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

export const mainLoadHtml = function (markdownId) {
  return function (dispatch, getState) {
    // 未传入id则说明不是通过点击进行切换
    if (!markdownId) {
      markdownId = getState().main.readMdId;
    }
    let token = '';
    if (getState().loginDialog.token !== undefined) {
      token = getState().loginDialog.token;
    }
    dispatch({type: MAIN_LOAD_HTML_REQUEST, payload: {readMdId: markdownId}});
    $.ajax({
      url: Api.BASE_URL + `markdown/${markdownId}`,
      headers: {"X-Access-Token": token},
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
    }
    {
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
  if (mdName.length === 0) {
    return {type: ADD_MD_NAME_IS_NULL,}
  } else if (proName.length === 0) {
    return {type: ADD_MD_PROJECT_IS_NULL,}
  }

  return function (dispatch, getState) {
    const account = getState().loginDialog.account;
    if (!account) {
      dispatch(mainMsgOpen("账号未登录"));
      return;
    }

    dispatch({type: ADD_MD_REQUEST, payload: {usedProName: proName}});
    const userId = account.id;
    if (!userId) {
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

// --- drawer ---

export const leftIconOnClick = function () {
  return function (dispatch, getState) {
    dispatch(navOpenChange(true));
  }
};
export const navOpenChange = function (open) {
  return {type: NAV_OPEN_CHANGE, payload: {open}};
};

const navLoadReceive = function (result) {
  return {
    type: NAV_LOAD_RECEIVE,
    payload: result,
  };
};

const navLoadError = function () {
  return {
    type: NAV_LOAD_ERROR,
  };
};

export const navLoad = function () {
  return function (dispatch, getState) {
    if (isLogin(dispatch, getState)) {
      dispatch({type: NAV_LOAD_REQUEST})
      const account = getState().loginDialog.account;
      const user_id = account.id;
      $.ajax({
        url: Api.BASE_URL + `user/${user_id}/project`,
        headers: {"X-Access-Token": getState().loginDialog.token},
        success: function (result, jqXHR) {
          // dispatch(navLoadReceive(result));
          dispatch(fetchReceive(result, NAV_LOAD_RECEIVE));
        },
        error: function (jqXHR, status, errorThrown) {
          dispatch(fetchError(status));
        },
      });
    } else {
      dispatch({type: NAV_LOAD_REQUEST})
      $.ajax({
        // 获取公开的项目
        url: Api.BASE_URL + `project`,
        headers: {"X-Access-Token": ''},
        success: function (result, jqXHR) {
          // dispatch(navLoadReceive(result));
          dispatch(fetchReceive(result, NAV_LOAD_RECEIVE));
        },
        error: function (jqXHR, status, errorThrown) {
          dispatch(fetchError(status));
        },

      });
    }
  }
};

//---SharedDialog---
export const sharedOpenChange = function (open) {
  return {type: actionType.SHARED_OPEN_CHANGE, payload: {open}}
};


