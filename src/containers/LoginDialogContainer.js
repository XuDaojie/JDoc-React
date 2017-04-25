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

const BASE_URL = "http://localhost:8080/JDoc/";

const style = {
  progressNone: {
    backgroundColor: '#00bcd4', display: 'none'
  },
  progress: {
    backgroundColor: '#00bcd4', display: 'block'
  }
};
let userInput, pwdInput;

let LoginDialogContainer = function ({
                                       open, modal, disable, userErrorMsg, pwdErrorMsg, btnText,
                                       progressStyle,
                                       onDialogClose, onInputChange, onBtnClick,
                                     }) {
  return (
    <Dialog
      title="登录"
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
      <RaisedButton
        label={btnText} primary={true} style={{marginTop: 16}}
        disabled={disable}
        fullWidth={true}
        onTouchTap={onBtnClick}/>
      <LinearProgress
        mode="indeterminate" color="#0288D1"
        style={progressStyle}/>
      <div style={{textAlign: 'center', fontSize: 14, marginTop: 16}}>注册账号</div>
    </Dialog>
  );
};

LoginDialogContainer.propTypes = {
  open: React.PropTypes.bool,
  modal: React.PropTypes.bool,
  disable: React.PropTypes.bool,
  userErrorMsg: React.PropTypes.string,
  pwdErrorMsg: React.PropTypes.string,
  btnText: React.PropTypes.string,
  progressStyle: React.PropTypes.object,
  onBtnClick: React.PropTypes.func,
  onDialogClose: React.PropTypes.func,
  onInputChange: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.loginDialog.open,
    modal: state.loginDialog.modal,
    disable: state.loginDialog.disable,
    userErrorMsg: state.loginDialog.userErrorMsg,
    pwdErrorMsg: state.loginDialog.pwdErrorMsg,
    btnText: state.loginDialog.btnText,
    progressStyle: state.loginDialog.progressStyle,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  return {
    onBtnClick: function () {
      const username = userInput.input.value;
      const password = pwdInput.input.value;
      dispatch(action.login(username, password));
    },
    onDialogClose: function () {
      dispatch(action.loginOpenChange(false));
    },
    onInputChange: function (e, newVal) {
      dispatch(action.inputChange());
    }
  };
};

// class LoginDialog extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       loginDisabled: false,
//       logining: false,
//       loginText: "登录",
//       progress: style.progressNone,
//       userErrorMsg: null,
//       pwdErrorMsg: null,
//       username: "",
//       password: "",
//     };
//   }
//
//   static propTypes = {
//     onLoginSuccess: React.PropTypes.func.isRequired,
//   };
//
//   componentWillReceiveProps(nextProps) {
//     this.setState({open: nextProps.open});
//   }
//
//   handleClose() {
//     // this.setState({open: false});
//     // this.setState({open}, this.props.onRequestClose());
//     this.setState({
//       open: false,
//       state: "登录",
//       loginDisabled: false,
//       progress: style.progressNone
//     }, () => this.props.onRequestClose());
//   }
//
//   handleLoginTap() {
//     const userValue = this.refs.userInput.input.value;
//     const pwdValue = this.refs.pwdInput.input.value;
//     if (userValue === '' || !userValue) {
//       this.setState({userErrorMsg: "用户名不能为空"});
//       return;
//     } else if (pwdValue === '' || !pwdValue) {
//       this.setState({pwdErrorMsg: "密码不能为空"});
//       return;
//     }
//
//     $.get(
//       BASE_URL + "login.do",
//       {
//         username: userValue,
//         password: pwdValue,
//       },
//       data => {
//         // console.log(data);
//         if (data.code === 0) {
//           this.setState({loginText: "登录成功"});
//           setTimeout(() => {
//             this.handleClose();
//             // this.setState({}, this.props.onLoginSuccess());
//             this.props.onLoginSuccess();
//           }, 1500);
//         } else {
//           this.setState({pwdErrorMsg: data.msg});
//           this.setState({loginDisabled: false});
//           this.setState({progress: style.progressNone});
//         }
//       });
//     this.setState({loginDisabled: true});
//     this.setState({progress: style.progress});
//   }
//
//   handleInputChange(event, newVal) {
//     if (this.state.userErrorMsg !== null) {
//       this.setState({userErrorMsg: null});
//     }
//     if (this.state.pwdErrorMsg !== null) {
//       this.setState({pwdErrorMsg: null});
//     }
//   }
//
//   render() {
//     return (
//       <Dialog
//         title="登录"
//         modal={this.state.loginDisabled}
//         open={this.state.open}
//         onRequestClose={this.handleClose.bind(this)}>
//         <TextField
//           ref="userInput"
//           floatingLabelText="账号"
//           errorText={this.state.userErrorMsg}
//           disabled={this.state.loginDisabled}
//           fullWidth={true}
//           onChange={this.handleInputChange.bind(this)}/><br/>
//         <TextField
//           ref="pwdInput"
//           floatingLabelText="密码"
//           // value={this.state.password}
//           errorText={this.state.pwdErrorMsg}
//           type="password"
//           disabled={this.state.loginDisabled}
//           fullWidth={true}
//           onChange={this.handleInputChange.bind(this)}/>
//         <RaisedButton label={this.state.loginText} primary={true} style={{marginTop: 16}}
//                       disabled={this.state.loginDisabled}
//                       fullWidth={true}
//                       onTouchTap={this.handleLoginTap.bind(this)}/>
//         <LinearProgress
//           mode="indeterminate" color="#0288D1"
//           style={this.state.progress}/>
//         <div style={{textAlign: 'center', fontSize: 14, marginTop: 16}}>注册账号</div>
//
//       </Dialog>
//     );
//   };
//
// }
LoginDialogContainer = connect(mapStateToProps, mapDispatchToProps)(LoginDialogContainer);

export default LoginDialogContainer;