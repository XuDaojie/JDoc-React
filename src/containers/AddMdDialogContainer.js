/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import AutoComplete from 'material-ui/AutoComplete';

import * as action from '../actions';

let userInput, desInput, proInput, pwdInput;

const dataSource2 = ['12345', '23456', '34567', '12345', '23456', '34567', '12345', '23456', '34567', 'AAA', '你好'];


let AddMdDialogContainer = function ({
                                       open, modal, disable, nameErrorMsg, pwdErrorMsg, proErrorMsg,
                                       searchProName, btnText, progressStyle,
                                       onDialogClose, onInputChange, onBtnClick,
                                     }) {
  return (
    <Dialog
      title="新建文档"
      open={open}
      modal={modal}
      onRequestClose={onDialogClose}>
      <TextField
        ref={function (input) {
          userInput = input;
        }}
        floatingLabelText="名称"
        errorText={nameErrorMsg}
        disabled={disable}
        fullWidth={true}
        onChange={onInputChange}/><br/>
      <TextField
        ref={function (input) {
          desInput = input;
        }}
        floatingLabelText="简述"
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
      <AutoComplete
        ref={function (input) {
          proInput = input;
        }}
        searchText={searchProName}
        floatingLabelText="归属项目"
        errorText={proErrorMsg}
        filter={AutoComplete.fuzzyFilter}
        openOnFocus={true}
        dataSource={dataSource2}
        fullWidth={true}/><br/>
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

AddMdDialogContainer.propTypes = {
  open: React.PropTypes.bool,
  modal: React.PropTypes.bool,
  disable: React.PropTypes.bool,
  nameErrorMsg: React.PropTypes.string,
  pwdErrorMsg: React.PropTypes.string,
  proErrorMsg: React.PropTypes.string,
  searchProName: React.PropTypes.string,
  btnText: React.PropTypes.string,
  progressStyle: React.PropTypes.object,
  onBtnClick: React.PropTypes.func,
  onDialogClose: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.addMdDialog.open,
    modal: state.addMdDialog.modal,
    disable: state.addMdDialog.disable,
    nameErrorMsg: state.addMdDialog.nameErrorMsg,
    pwdErrorMsg: state.addMdDialog.pwdErrorMsg,
    proErrorMsg: state.addMdDialog.proErrorMsg,
    searchProName: state.addMdDialog.searchProName,
    btnText: state.addMdDialog.btnText,
    progressStyle: state.addMdDialog.progressStyle,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  return {
    onBtnClick: function () {
      const mdName = userInput.input.value;
      // const pwd = pwdInput.input.value;
      const mdDes = desInput.input.value;
      const proName = proInput.state.searchText;
      dispatch(action.addMD(mdName, mdDes, proName));
    },
    onDialogClose: function () {
      dispatch(action.addMdOpenChange(false));
    },
    onInputChange: function (e, newVal) {
      dispatch(action.addMdInputChange());
    }
  };
};

AddMdDialogContainer = connect(mapStateToProps, mapDispatchToProps)(AddMdDialogContainer);

export default AddMdDialogContainer;