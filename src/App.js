import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import $ from 'jquery/dist/jquery.min';
import jsrsasign from 'jsrsasign';
// import b64x from './lib/base64x-1.1.min';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
// import Dialog from 'material-ui/Dialog';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

import LoginDialog from "./LoginDialog";
import ProjectContent from "./ProjectContent";
import DrawerNav from "./DrawerNav";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo"/>
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const BASE_URL = "http://localhost:8080/JDoc/";

class App extends Component {

  constructor(props) {
    injectTapEventPlugin();
    super(props);
    this.state = {
      openDrawer: false,
      openLogin: false,

      drawerData: [],
      markdownId: null,
    };
  }

  leftIconClick() {
    this.setState({openDrawer: !this.state.openDrawer});
  };

  drawerClose() {
    this.setState({openDrawer: false});
  }

  handleDialogClose() {
    this.state = {openLogin: false};
  }

  handleLoginSuccess() {
    $.get(
      BASE_URL + "project_list.do",
      {
        // todo user_id: 1
        user_id: 1,
      },
      result => {
        if (result.code === 0) {
          this.setState({drawerData: result.data});
        }
      }
    );
  }

  openDialog() {
    this.setState({openLogin: true});
    this.drawerClose();
  }

  render() {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjE0MjAwNDUyNjEsImFkbWluIjp0cnVlfQ.Uyn5F42wOMwgkzU15h2BVdcBtkmHfHfp_IYr2k3OCIM";
    const jws = jsrsasign.KJUR.jws;
    // 只验证是否能解析
    var isValid = jws.JWS.verifyJWT(token, "secret", {alg: ['HS256']});
    // 验证 是否能解析、过期时间
    isValid = jws.JWS.verifyJWT(token, "secret", {
      alg: ['HS256'],
      verifyAt: jws.IntDate.get('20160601000000Z')
    });
    console.log(isValid);
    // 获取数据
    var headerObj = jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[0]));
    var payloadObj = jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[1]));
    console.log(headerObj);

    // const oHeader = {alg: "HS256", typ: "JWT"};
    // const oPayload = {sub: "123456789", name: "John Doe", exp: 1420045261, admin: true};
    // const sHeader = JSON.stringify(oHeader);
    // const sPayload = JSON.stringify(oPayload);
    // const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "secret");
    // console.log(sJWT);

    const oHeader = {alg: "HS256", typ: "JWT"};
    const oPayload = {user_id: 1,};
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "jdoc");
    $.get(
      BASE_URL + "api/project",
      {
        token: sJWT,
      },
      function (data, status) {
        console.log(status);
      });

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title=""
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.leftIconClick.bind(this)}
            onTitleTouchTap={this.openDialog.bind(this)}>
            <DrawerNav
              open={this.state.openDrawer}
              docked={false}
              data={this.state.drawerData}
              onRequestChange={(openDrawer) => {
                this.setState({openDrawer})
              }}
              onNestedListToggle={key => {
                this.setState({markdownId: key});
              }}
            />
            <LoginDialog
              open={this.state.openLogin}
              onRequestClose={this.handleDialogClose.bind(this)}
              onLoginSuccess={this.handleLoginSuccess.bind(this)}/>
          </AppBar>
          <ProjectContent markdownId={this.state.markdownId}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
