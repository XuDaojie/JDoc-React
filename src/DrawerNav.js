/**
 * Created by xdj on 2017/4/21.
 */
import React, {Component} from'react';
import PropTypes from 'prop-types';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import AppBar from 'material-ui/AppBar';

import $ from 'jquery/dist/jquery.min';

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

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}>
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

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
    onNestedListToggle: React.PropTypes.func,
  };

  componentDidMount() {
  }

  _onNestedListToggle(item, key) {
    this.setState({}, this.props.onNestedListToggle(item, key))
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
        {/*value 值与key类似,作为索引,相同则认为是同一个*/}
        <SelectableList defaultValue={0}>
          {this.props.data.map(item => {
            if (item.markdownList) { // 空会自动转为false
              return <ListItem
                key={item.id}
                primaryText={item.name}
                secondaryText={item.description}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={item.markdownList.map(md => <ListItem
                  key={md.id}
                  value={"p" + item.id + "c" + md.id}
                  primaryText={md.name}
                  primaryTogglesNestedList={true}
                  onNestedListToggle={this._onNestedListToggle.bind(this, md.id)}
                  initiallyOpen={false}/>)}/>;
            } else {
              return <ListItem
                key={item.id}
                primaryText={item.name}
                secondaryText={item.description}
                initiallyOpen={false}/>
            }
          })}
        </SelectableList>
        ----------------------
        <MenuItem>Menu Item</MenuItem>
      </Drawer>
    )
  };

}

export default ProjectContent;