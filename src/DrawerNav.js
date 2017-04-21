/**
 * Created by xdj on 2017/4/21.
 */
/**
 * Created by xdj on 2017/4/21.
 */
import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import AppBar from 'material-ui/AppBar';

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
};

class ProjectContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  static defaultProps = {
    data: [],
  };

  static propTypes = {
    data: React.PropTypes.array,
    onRequestChange: React.PropTypes.func,
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({open: nextProps.open})
  }

  render() {
    return (
      <Drawer open={this.state.open} docked={false}
              onRequestChange={(open) => {
                this.setState({open: open}, this.props.onRequestChange(open));
              }}>
        <AppBar/>
        <List>
          {this.props.data.map(function (item) {
            if (item.markdownList) { // 空会自动转为false
              return <ListItem
                key={item.id}
                primaryText={item.name}
                secondaryText={item.description}
                initiallyOpen={false}
                nestedItems={item.markdownList.map(function (md) {
                  return<ListItem
                    key={md.id}
                    primaryText={md.name}
                    initiallyOpen={false}/>;
                })}/>;
            } else {
              return <ListItem
                key={item.id}
                primaryText={item.name}
                secondaryText={item.description}
                initiallyOpen={false}/>
            }
          })}
        </List>
        ----------------------
        <MenuItem>Menu Item</MenuItem>
      </Drawer>
    )
  };

}

export default ProjectContent;