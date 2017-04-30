/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import * as action from '../actions';

let userInput, pwdInput, pwdInput2;

let RegisterDialogContainer = function ({
                                       open, modal, disable, userErrorMsg, pwdErrorMsg, pwdErrorMsg1, btnText,
                                       progressStyle,
                                       onDialogClose, onInputChange, onBtnClick,
                                     }) {
  return (
    <Dialog
      title="注册"
      open={open}
      modal={modal}
      onRequestClose={onDialogClose}>
      <TextField
        ref={function (input) {
          userInput = input;
        }}
        floatingLabelText="账号"
        errorText={userErrorMsg}
        disabled={disable}
        fullWidth={true}
        onChange={onInputChange}/><br/>
      <TextField
        ref={function (input) {
          pwdInput = input;
        }}
        floatingLabelText="密码"
        // value={this.state.password}
        errorText={pwdErrorMsg}
        type="password"
        disabled={disable}
        fullWidth={true}
        onChange={onInputChange}/>
      <TextField
        ref={function (input) {
          pwdInput2 = input;
        }}
        floatingLabelText="确认密码"
        // value={this.state.password}
        errorText={pwdErrorMsg1}
        type="password"
        disabled={disable}
        fullWidth={true}
        onChange={onInputChange}/>
      <RaisedButton
        label={btnText} primary={true} style={{marginTop: 16}}
        disabled={disable}
        fullWidth={true}
        onTouchTap={onBtnClick}/>
      <LinearProgress
        mode="indeterminate" color="#0288D1"
        style={progressStyle}/>
    </Dialog>
  );
};

RegisterDialogContainer.propTypes = {
  open: React.PropTypes.bool,
  modal: React.PropTypes.bool,
  disable: React.PropTypes.bool,
  userErrorMsg: React.PropTypes.string,
  pwdErrorMsg: React.PropTypes.string,
  pwdErrorMsg1: React.PropTypes.string,
  btnText: React.PropTypes.string,
  progressStyle: React.PropTypes.object,
  onBtnClick: React.PropTypes.func,
  onDialogClose: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.registerDialog.open,
    modal: state.registerDialog.modal,
    disable: state.registerDialog.disable,
    userErrorMsg: state.registerDialog.userErrorMsg,
    pwdErrorMsg: state.registerDialog.pwdErrorMsg,
    pwdErrorMsg1: state.registerDialog.pwdErrorMsg1,
    btnText: state.registerDialog.btnText,
    progressStyle: state.registerDialog.progressStyle,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  return {
    onBtnClick: function () {
      const username = userInput.input.value;
      const password = pwdInput.input.value;
      const password2 = pwdInput2.input.value;
      dispatch(action.register(username, password, password2));
    },
    onDialogClose: function () {
      dispatch(action.registerOpenChange(false));
    },
    onInputChange: function (e, newVal) {
      dispatch(action.registerInputChange());
    }
  };
};

RegisterDialogContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterDialogContainer);

export default RegisterDialogContainer;