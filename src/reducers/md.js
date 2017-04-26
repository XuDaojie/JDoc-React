/**
 * Created by xdj on 2017/4/25.
 */
import {
  MAIN_LOAD_HTML, MAIN_LOAD_HTML_RECEIVE
} from '../constants/ActionTypes';
import marked from 'marked';

/*
 {
 open, disable, userErrorMsg, pwdErrorMsg, btnText,
 progressStyle,
 onDialogClose, onInputChange
 }
 */
const style = {
  progressNone: {
    backgroundColor: '#00bcd4', display: 'none'
  },
  progress: {
    backgroundColor: '#00bcd4', display: 'block'
  }
};

const main = function (state = {sHtml: "<div>Main</div>"}, action) {
  const payload = action.payload;

  switch (action.type) {
    case MAIN_LOAD_HTML_RECEIVE:
      if(payload.code === 0) {
        return {
          ...state,
          markdown: action.payload,
          sHtml: marked(payload.data.content),
        };
      }
      return {
        ...state,
        sHtml: marked(payload.data.content),
      };
    default:
      return state;
  }
};

export default main;