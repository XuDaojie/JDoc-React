/**
 * Created by xdj on 2017/4/20.
 */
import * as React from "react";
import {connect} from "react-redux";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from "material-ui/TextField";

import {closeLogin} from "../actions/index";

// 读取state
const mapStateToProps = function (state) {
  return {
    // openLogin: state.openLogin,
    open: state.loginDialog.openLogin,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  return {
    handleClose: function () {
      dispatch(closeLogin());
    },
  };
};
// 参数是propTypes
let LoginDialogContainer = function ({open, handleClose}) {
  // 映射的数据
  console.log({open});
  // open={open}
  return (
    <Dialog
      title="登录"
      modal={false}
      open={open}
      onRequestClose={handleClose}>
      <TextField
        floatingLabelText="账号"
        errorText=""
        disabled={false}
        fullWidth={true}/><br/>
      <TextField
        floatingLabelText="密码"
        errorText=""
        type="password"
        disabled={false}
        fullWidth={true}/>
      <RaisedButton
        label="登录" primary={true} style={{marginTop: 16}}
        disabled={false}
        fullWidth={true}/>
    </Dialog>
  );
};

LoginDialogContainer.propTypes = {
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
};

LoginDialogContainer = connect(mapStateToProps, mapDispatchToProps)(LoginDialogContainer);

export default LoginDialogContainer;