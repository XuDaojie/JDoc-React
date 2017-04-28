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
import ContentCreate from "material-ui/svg-icons/content/create";
import AddMdDialogContainer from "./AddMdDialogContainer";
import {Snackbar} from "material-ui";

let MainContainer = function ({msgOpen, msg, fabStyle, _fabOnClick, _msgOnClose}) {
  return (
    <div>
      <Snackbar
        open={msgOpen}
        message={msg}
        autoHideDuration={3000}
        onRequestClose={_msgOnClose}
      />
      <AddMdDialogContainer/>
      <MdContainer/>
      <FloatingActionButton
        secondary={true}
        // 64\64
        style={fabStyle}
        zDepth={4}
        onTouchTap={_fabOnClick}>
        <ContentCreate />
      </FloatingActionButton>
      {/*<iframe src="http://localhost:8080/JDoc/index.jsp"/>*/}
    </div>
  );
};

MainContainer.propTypes = {
  msgOpen: React.PropTypes.bool,
  msg: React.PropTypes.string,
  fabStyle: React.PropTypes.object,
  _fabOnClick: React.PropTypes.func,
  _msgOnClose: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    msgOpen: state.main.msgOpen,
    msg: state.main.msg,
    fabStyle: state.main.fabStyle,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  // todo 默认markdown——id
  // dispatch(action.mainLoadHtml(5));
  return {
    _fabOnClick: function () {
      dispatch(action.editMdOnClick(true));
    },
    _msgOnClose: function () {
      dispatch(action.mainMsgClose());
    },
  };
};

MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer);
export default MainContainer;