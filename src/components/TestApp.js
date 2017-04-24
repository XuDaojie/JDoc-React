import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TestLoginDialog from "../containers/TestLoginDialog";
import TestLoginBtn from "../containers/TestLoginBtn";

class TestApp extends Component {

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
          <TestLoginDialog/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TestApp;
