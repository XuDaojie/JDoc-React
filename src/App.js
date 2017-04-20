import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
// import Dialog from 'material-ui/Dialog';

import LoginDialog from "./LoginDialog";

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
class App extends Component {

  constructor(props) {
    injectTapEventPlugin();
    super(props);
    this.state = {open: false, openLogin: false};
  }


  handleClick() {
    this.setState({open: !this.state.open});
  };

  handleClose() {
    this.setState({open: false});
  }

  handleDialogClose() {
    this.state = {openLogin: false};
  }

  openDialog() {
    this.setState({openLogin: true});
    this.handleClose();
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title=""
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleClick.bind(this)}>
          <Drawer open={this.state.open} docked={false}
                  onRequestChange={(open) => this.setState({open})}>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.openDialog.bind(this)}>Menu Item 2</MenuItem>
          </Drawer>
          <LoginDialog
            open={this.state.openLogin}
            onRequestClose={this.handleDialogClose.bind(this)}/>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default App;
