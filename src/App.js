import React, {Component} from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import LoginDialogContainer from "./containers/LoginDialogContainer";
import AppBar from './containers/AppBarContainer';
import MainContainer from "./containers/MainContainer";
import NavDrawerContainer from "./containers/NavDrawerContainer";

class App extends Component {

  constructor(props) {
    injectTapEventPlugin();
    super(props);
  }

  render() {

    return (
      <MuiThemeProvider>
        <div>
          <NavDrawerContainer/>
          <LoginDialogContainer/>
          <AppBar/>
          <MainContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
