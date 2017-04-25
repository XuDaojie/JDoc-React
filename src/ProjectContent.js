/**
 * Created by xdj on 2017/4/21.
 */
import React from 'react';
import marked from 'marked';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import $ from 'jquery/dist/jquery.min';

const BASE_URL = "http://localhost:8080/JDoc/";

const style = {
  root: {
    display: "flex",
    // justifyContent: "space-between",
    justifyContent: "center",

    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  list: {
    width: 500,
    // height: 450,
    // overflowY: 'auto',
  },
  markdown: {
  },
};

class ProjectContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markdownId: null,
    };
  }

  static propTypes = {};

  componentDidMount() {
    this.loadMarkdown();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.markdownId !== this.state.markdownId){
      this.setState({markdownId: nextProps.markdownId});
      console.log("componentWillReceiveProps" + nextProps.markdownId);
      this.loadMarkdown();
    }
  }

  loadMarkdown(){
    if(this.state.markdownId !== null){
      $.get(
        BASE_URL + "markdown.do",
        {
          id: this.state.markdownId,
        },
        result => {
          if (result.code === 0) {
            $("#markdown_div").html(marked(result.data.content));
          } else {
            $("#markdown_div").html(<div>内容不存在</div>);
          }
        }
      )
    } else {
      console.log("内容不存在");
      $("#markdown_div").html(marked("> 内容不存在"));
    }
  }

  render() {
    return (
      <div style={style.root}>
        <div id="markdown_div"/>
      </div>
    )
  };

}

export default ProjectContent;