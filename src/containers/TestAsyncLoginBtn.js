/**
 * Created by xdj on 2017/4/23.
 */
import * as React from "react";
import {connect} from "react-redux";
import RaisedButton from 'material-ui/RaisedButton';
import {showLogin, testAsync} from '../actions/testAsyncIndex';
import TestLoginDialog from "./TestLoginDialog";

let ShowLogin = function ({dispatch}) {
  return (
    <div>
      <RaisedButton
        label="登录"
        onTouchTap={function () {
          // dispatch(showLogin("text"));
          dispatch(testAsync("redux thunk"))
        }}/>
    </div>

  );
};

// 读取state
const mapStateToProps = function (state, ownProps) {
  return {
    // openLogin: state.openLogin,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch) {
  return {};
};

ShowLogin = connect()(ShowLogin);

export default ShowLogin;