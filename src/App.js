import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import LoginDialogContainer from "./containers/LoginDialogContainer";
import LoginBtnContainer from "./containers/LoginBtnContainer";

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
          <LoginBtnContainer/>
          <LoginDialogContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
