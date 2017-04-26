/**
 * Created by xdj on 2017/4/21.
 */
import React, {Component} from'react';
import {connect} from "react-redux";
import * as action from '../actions';
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
import Toolbar from "material-ui/Toolbar";

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

let NavDrawerContainer = function ({open, _requestChange,}) {
  return (
    <Drawer
      open={open}
      docked={false}
      onRequestChange={_requestChange}>
      <List style={{padding: 0}}>
        <Toolbar style={{backgroundColor: '#00bcd4',}}/>
        <ListItem primaryText="xxx"/>
        <ListItem primaryText="xxx"/>
      </List>
    </Drawer>
  );
};
NavDrawerContainer.propTypes = {
  open: React.PropTypes.bool,
  data: React.PropTypes.object,
  _requestChange: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.nav.open,
    data: state.nav.data,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  // login中已经进行过绑定，直接将dispatch传递过来
  dispatch(action.navLoad());
  return {
    _requestChange: function (open) {
      dispatch(action.navOpenChange(open));
    },

  };
};

// class NavDrawerContainer extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//     };
//   }
//
//   static defaultProps = {
//     data: [],
//   };
//
//   static propTypes = {
//     data: React.PropTypes.array,
//     onRequestChange: React.PropTypes.func,
//     onNestedListToggle: React.PropTypes.func,
//   };
//
//   componentDidMount() {
//   }
//
//   _onNestedListToggle(item, key) {
//     this.setState({}, this.props.onNestedListToggle(item, key))
//   }
//
//   componentWillReceiveProps(nextProps) {
//     this.setState({open: nextProps.open})
//   }
//
//   render() {
//     return (
//       <Drawer open={this.state.open} docked={false}
//               onRequestChange={(open) => {
//                 this.setState({open: open}, this.props.onRequestChange(open));
//               }}>
//         <AppBar/>
//         {/*value 值与key类似,作为索引,相同则认为是同一个*/}
//         <SelectableList defaultValue={0}>
//           {this.props.data.map(item => {
//             if (item.markdownList) { // 空会自动转为false
//               return <ListItem
//                 key={item.id}
//                 primaryText={item.name}
//                 secondaryText={item.description}
//                 initiallyOpen={false}
//                 primaryTogglesNestedList={true}
//                 nestedItems={item.markdownList.map(md => <ListItem
//                   key={md.id}
//                   value={"p" + item.id + "c" + md.id}
//                   primaryText={md.name}
//                   primaryTogglesNestedList={true}
//                   onNestedListToggle={this._onNestedListToggle.bind(this, md.id)}
//                   initiallyOpen={false}/>)}/>;
//             } else {
//               return <ListItem
//                 key={item.id}
//                 primaryText={item.name}
//                 secondaryText={item.description}
//                 initiallyOpen={false}/>
//             }
//           })}
//         </SelectableList>
//         ----------------------
//         <MenuItem>Menu Item</MenuItem>
//       </Drawer>
//     )
//   };
//
// }
NavDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(NavDrawerContainer);
export default NavDrawerContainer;