/**
 * Created by xdj on 2017/4/20.
 */
import * as React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import {closeLogin} from "../actions/testIndex";

// 读取state
const mapStateToProps = function (state) {
  return {
    // openLogin: state.openLogin,
    // open: state.testLoginReducer.openLogin,
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
let TestLoginDialog = function ({open, handleClose}) {
  // 映射的数据
  // console.log({open});
  // open={open}
  return (
    <Dialog
      title="登录"
      modal={false}
      open={open}
      onRequestClose={handleClose}/>
  );
};

TestLoginDialog.propTypes = {
  open: React.PropTypes.bool,
  handleClose: React.PropTypes.func,
};

// TestLoginDialog.propTypes = {
//   openLogin: React.PropTypes.bool,
// };

// class TestLoginDialog extends React.Component {

// render() {
//   return (
//     <Dialog
//       title="登录"
//       modal={false}
//       open={false}>
//       <TextField
//         ref="userInput"
//         floatingLabelText="账号"
//         errorText=""
//         disabled={false}
//         fullWidth={true}/><br/>
//       <TextField
//         ref="pwdInput"
//         floatingLabelText="密码"
//         errorText=""
//         type="password"
//         disabled={false}
//         fullWidth={true}/>
//       <RaisedButton label="登录" primary={true} style={{marginTop: 16}}
//                     disabled={false}
//                     fullWidth={true}/>
//       <LinearProgress
//         mode="indeterminate" color="#0288D1"
//         style={this.style.progress}/>
//     </Dialog>
//   );
// };

// }

TestLoginDialog = connect(mapStateToProps, mapDispatchToProps)(TestLoginDialog);
// TestLoginDialog = connect()(TestLoginDialog);

export default TestLoginDialog;