/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from "material-ui/FlatButton";
import zeroclipboard from 'zeroclipboard';
import ReactZeroClipboard from 'react-zeroclipboard';

import * as action from '../actions';

const style = {
  code: {
    padding: 0,
    paddingTop: '0.2em',
    paddingBottom: '0.2em',
    margin: 0,
    color: '#d14',
    fontSize: '85%',
    backgroundColor: '#f7f7f9',
    borderRadius: 3,
    border: '1px solid #e1e1e8',
  },
  copy: {fontSize: 14, color: '#08c', textDecoration: 'none'}
};

let copyBtn, proUrlInput;
let SharedDialogContainer = function ({
                                        open, projectUrl, pageUrl,
                                        _dialogClose, _copy
                                      }) {
  const actions = [
    <ReactZeroClipboard text={projectUrl}>
      <FlatButton
        ref={function (input) {
          copyBtn = input;
        }}
        label="复制地址"
        primary={true}
        keyboardFocused={true}
        onTouchTap={_copy}
      />
    </ReactZeroClipboard>

  ];
  return (
    <Dialog
      title="分享"
      open={open}
      modal={false}
      actions={actions}
      onRequestClose={_dialogClose}>
      {/*<code id="share-page-link" style={style.code}>{projectUrl}</code>&nbsp;&nbsp;&nbsp;&nbsp;*/}
      {/*<a href="#" style={style.copy} onClick={() => alert('xxx')}>复制地址</a>*/}
      <TextField
        ref={function (input) {
          proUrlInput = input;
        }}
        floatingLabelText="项目地址"
        defaultValue={projectUrl}
        fullWidth={true}
        inputStyle={{color: '#d14', fontSize: '85%'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
      {/*<a href="#" style={style.copy} onClick={() => alert('xxx')}>复制地址</a>*/}

    </Dialog>
  );
};

SharedDialogContainer.propTypes = {
  open: React.PropTypes.bool,
  projectUrl: React.PropTypes.string,
  pageUrl: React.PropTypes.string,

  _dialogClose: React.PropTypes.func,
  _copy: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.sharedDialog.open,
    projectUrl: state.sharedDialog.projectUrl,
    pageUrl: state.sharedDialog.pageUrl,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    _dialogClose: function () {
      dispatch(action.sharedOpenChange(false));
    },
    _copy: function () {
      dispatch(action.mainMsgOpen("已复制到剪切板"));
    },
  };
};

SharedDialogContainer = connect(mapStateToProps, mapDispatchToProps)(SharedDialogContainer);

export default SharedDialogContainer;