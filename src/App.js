import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import $ from 'jquery/dist/jquery.min';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
// import Dialog from 'material-ui/Dialog';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

import LoginDialog from "./LoginDialog";
import ProjectList from "./ProjectGrid";
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
      contentMain: <ProjectContent/>,
      drawerData: [
        {
          id: 1,
          nested: [{
            id: 3,
          }]
        },
        {
          id: 2,
          nested: [{
            id: 3,
          }]
        },
      ],
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
    this.setState({contentMain: <ProjectList/>});

    $.get(
      BASE_URL + "project_list.do",
      {
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
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title=""
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.leftIconClick.bind(this)}
            onTitleTouchTap={this.openDialog.bind(this)}>
            {/*<Drawer open={this.state.open} docked={false}*/}
            {/*onRequestChange={(open) => this.setState({open})}>*/}
            {/*<MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>*/}
            {/*<MenuItem onTouchTap={this.openDialog.bind(this)}>Menu Item 2</MenuItem>*/}
            {/*</Drawer>*/}
            <DrawerNav
              open={this.state.openDrawer}
              docked={false}
              data={this.state.drawerData}
              onRequestChange={(openDrawer) => {
                this.setState({openDrawer})
              }}/>
            <LoginDialog
              open={this.state.openLogin}
              onRequestClose={this.handleDialogClose.bind(this)}
              onLoginSuccess={this.handleLoginSuccess.bind(this)}/>
          </AppBar>
          {this.state.contentMain}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
