/**
 * Created by xdj on 2017/4/25.
 */
import React from 'react';
import {connect} from "react-redux";
import * as action from '../actions';
// import 'github-markdown-css';
import '../css/md.preview.css';
import MdContainer from "./MdContainer";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import AddMdDialogContainer from "./AddMdDialogContainer";
import {Snackbar} from "material-ui";

let MainContainer = function ({msgOpen, msg, ftbOnClick, msgOnClose}) {
  return (
    <div>
      <Snackbar
        open={msgOpen}
        message={msg}
        autoHideDuration={3000}
        onRequestClose={msgOnClose}
      />
      <AddMdDialogContainer/>
      <MdContainer/>
      <FloatingActionButton
        secondary={true}
        // 64\64
        style={{marginRight: 16, position: 'fixed', right: 64, bottom: 64}}
        zDepth={4}
        onTouchTap={ftbOnClick}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};

MainContainer.propTypes = {
  msgOpen: React.PropTypes.bool,
  msg: React.PropTypes.string,
  ftbOnClick: React.PropTypes.func,
  msgOnClose: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    msgOpen: state.main.msgOpen,
    msg: state.main.msg,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  // todo 默认markdown——id
  // dispatch(action.mainLoadHtml(5));
  return {
    ftbOnClick: function () {
      dispatch(action.addMdOpenChange(true));
    },
    msgOnClose: function () {
      dispatch(action.mainMsgClose());
    },
  };
};

MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer);
export default MainContainer;