/**
 * Created by xdj on 2017/4/25.
 */
import React from 'react';
import {connect} from "react-redux";
import * as action from '../actions';
// import 'github-markdown-css';
import '../css/md.preview.css';

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
  markdownBody: {
    boxSizing: "border-box",
    minWidth: "200",
    maxWidth: "980",
    margin: "auto",
    padding: 45
  }

};

let MdContainer = function ({sHtml}) {
  return (
    <div id="editormd" style={style.root}>
      <article className="markdown-body" style={style.markdownBody}>
        <div dangerouslySetInnerHTML={{__html: sHtml}}/>
      </article>
    </div>
  );
};

MdContainer.propTypes = {
  sHtml: React.PropTypes.element,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    sHtml: state.md.sHtml,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  return {};
};

MdContainer = connect(mapStateToProps, mapDispatchToProps)(MdContainer);
export default MdContainer;