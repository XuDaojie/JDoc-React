import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import LoginDialogContainer from "./containers/LoginDialogContainer";
import TestLoginBtn from "./containers/TestLoginBtn";

class App extends Component {

  constructor(props) {
    injectTapEventPlugin();
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Hello Redux">
          </AppBar>
          <TestLoginBtn/>
          <LoginDialogContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
