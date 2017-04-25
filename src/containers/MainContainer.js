/**
 * Created by xdj on 2017/4/25.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import * as action from '../actions';

const style = {
  root: {
    display: "flex",
    // justifyContent: "space-between",
    justifyContent: "center",

    // marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 56,
    marginBottom: 56

  },
  markdown: {
  },
};

let MainContainer = function ({sHtml}) {
  return (
    <div style={style.root}>
      <div dangerouslySetInnerHTML={{__html: sHtml}} />
    </div>
  );
};

MainContainer.propTypes = {
  sHtml: React.PropTypes.element,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    sHtml: state.main.sHtml,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  // todo 默认markdown——id
  dispatch(action.mainLoadHtml(5));
  return {};
};

MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer);
export default MainContainer;