/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import $ from 'jquery/dist/jquery.min';

const BASE_URL = "http://localhost:8080/JDoc/";

const style = {
    progressNone: {
      backgroundColor: '#00bcd4', display: 'none'
    },
    progress: {
      backgroundColor: '#00bcd4', display: 'block'
    }
  }
;

class CreateProjectDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      saveDisabled: false,
      logining: false,
      btnText: "保存",
      progress: style.progressNone,
      nameErrorMsg: null,
      pwdErrorMsg: null,
      username: "",
      password: "",
    };
  }

  static propTypes = {
    onRequestSuccess: React.PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  handleClose() {
    // this.setState({open: false});
    // this.setState({open}, this.props.onRequestClose());
    this.setState({
      open: false,
      state: "保存",
      saveDisabled: false,
      progress: style.progressNone
    }, () => this.props.onRequestClose());
  }

  handleLoginTap() {
    const nameValue = this.refs.nameInput.input.value;
    const desValue = this.refs.desInput.input.value;
    const pwdValue = this.refs.pwdInput.input.value;
    if (nameValue === '' || !nameValue) {
      this.setState({nameErrorMsg: "项目名不能为空"});
      return;
    }

    $.get(
      BASE_URL + "create_project.do",
      {
        name: nameValue,
        description: desValue,
        password: pwdValue,
      },
      result => {
        // console.log(data);
        if (result.code === 0) {
          this.setState({btnText: "保存成功"});
          setTimeout(() => {
            this.handleClose();
            // this.setState({}, this.props.onLoginSuccess());
            this.props.onRequestSuccess(result.data);
          }, 1500);
        } else {
          this.setState({nameErrorMsg: result.msg});
          this.setState({saveDisabled: false});
          this.setState({progress: style.progressNone});
        }
      });
    this.setState({saveDisabled: true});
    this.setState({progress: style.progress});
  }

  handleInputChange(event, newVal) {
    if (this.state.nameErrorMsg !== null) {
      this.setState({userErrorMsg: null});
    }
    if (this.state.pwdErrorMsg !== null) {
      this.setState({pwdErrorMsg: null});
    }
  }

  render() {
    return (
      <Dialog
        title="新建项目"
        modal={this.state.saveDisabled}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}>
        <TextField
          ref="nameInput"
          floatingLabelText="项目名"
          errorText={this.state.nameErrorMsg}
          disabled={this.state.saveDisabled}
          fullWidth={true}
          onChange={this.handleInputChange.bind(this)}/>
        <TextField
          ref="desInput"
          floatingLabelText="项目描述"
          disabled={this.state.saveDisabled}
          fullWidth={true}
          multiLine={true}
          rows={4}/>
        <TextField
          ref="pwdInput"
          floatingLabelText="密码"
          hintText="非必填"
          // value={this.state.password}
          errorText={this.state.pwdErrorMsg}
          disabled={this.state.saveDisabled}
          fullWidth={true}/>
        <RaisedButton label={this.state.btnText} primary={true} style={{marginTop: 16}}
                      disabled={this.state.saveDisabled}
                      fullWidth={true}
                      onTouchTap={this.handleLoginTap.bind(this)}/>
        <LinearProgress
          mode="indeterminate" color="#0288D1"
          style={this.state.progress}/>
      </Dialog>
    );
  };

}

export default CreateProjectDialog;