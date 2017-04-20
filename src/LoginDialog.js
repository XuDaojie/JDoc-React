/**
 * Created by xdj on 2017/4/20.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open});
  }

  handleClose() {
    // this.setState({open: false});
    // this.setState({open}, this.props.onRequestClose());
    this.setState({open: false}, () => this.props.onRequestClose());
  }

  render() {
    return (
      <Dialog
        title="登录"
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose.bind(this)}>
        <TextField
          defaultValue="Default Value"
          floatingLabelText="账号"
          fullWidth={true}/><br />
        <TextField
          floatingLabelText="密码"
          type="password"
          fullWidth={true}/>
        <RaisedButton label="登录" primary={true} style={{marginTop: 16}}
                      disabled={true}
                      fullWidth={true}/>
        <LinearProgress mode="indeterminate" color="#0288D1" style={{backgroundColor: '#00bcd4'}}/>
      </Dialog>
    );
  };

}

export default LoginDialog;