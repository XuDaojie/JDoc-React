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
justifyContent: "space-between",

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
    };
  }

  static propTypes = {};

  componentDidMount() {
    $.get(
      BASE_URL + "markdown.do",
      {
        // todo markdown_id: 5
        id: 5,
      },
      result => {
        if (result.code === 0) {
          $("#markdown_div").html(marked(result.data.content));
        } else {
          $("#markdown_div").html(<div>内容不存在</div>);
        }
      }
    )
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div style={style.root}>
        <div id="markdown_div"/>
        <List>
          <ListItem primaryText="Sent mail"/>
          <ListItem primaryText="Sent mail"/>
          <ListItem primaryText="Sent mail"/>
          <ListItem primaryText="Sent mail"/>
          <ListItem primaryText="Sent mail"/>
        </List>

      </div>
    )
  };

}

export default ProjectContent;