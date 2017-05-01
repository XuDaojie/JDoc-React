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
import Toolbar from "material-ui/Toolbar";
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

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

const iconButtonElement = (
  <IconButton
    touch={true}
    // tooltip="more"
    // tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}
            onItemTouchTap={function (e, child) {
              console.log("x");
            }}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem onTouchTap={function (e) {
      console.log(e);
    }}>Delete</MenuItem>
  </IconMenu>
);


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

let NavDrawerContainer = function ({
                                     open, docked, data,
                                     _requestChange, _nestedListToggle, _nestedItemRightIconTap
                                   }) {
  return (
    <Drawer
      open={open}
      docked={docked}
      onRequestChange={_requestChange}>
      <Toolbar style={{backgroundColor: '#00bcd4',}}/>
      <List >
        {data.map(item => {
          if (item.nestedItems) {
            return <ListItem
              key={item.id}
              primaryText={item.name}
              primaryTogglesNestedList={true}
              nestedItems={item.nestedItems.map(function (nestedItem) {
                return <ListItem
                  key={nestedItem.id}
                  primaryText={nestedItem.name}
                  primaryTogglesNestedList={true}
                  rightIconButton={
                    <IconMenu iconButtonElement={iconButtonElement}>
                      {/*<MenuItem>Reply</MenuItem>*/}
                      {/*<MenuItem>Forward</MenuItem>*/}
                      <MenuItem onTouchTap={_nestedItemRightIconTap.bind(this, nestedItem.id)}>Delete</MenuItem>
                    </IconMenu>
                  }
                  onNestedListToggle={_nestedListToggle.bind(this, nestedItem.id)}/>;
              })}/>
          } else {
            return <ListItem
              key={item.id}
              primaryText={item.name}
              primaryTogglesNestedList={true}/>;
          }
        })}
      </List>
    </Drawer>
  );
};
NavDrawerContainer.propTypes = {
  open: React.PropTypes.bool,
  data: React.PropTypes.array,
  _requestChange: React.PropTypes.func,
  _nestedListToggle: React.PropTypes.func,
  _nestedItemRightIconTap: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    open: state.nav.open,
    docked: state.nav.docked,
    data: state.nav.data,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;

  if (width / height > 1.75) {
    dispatch(action.navOpenChange(true));
    dispatch(action.drawerDockedChange(true));
  } else {
    dispatch(action.drawerDockedChange(false));
  }
  window.onresize = function () {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    if (width / height > 1.75) {
      dispatch(action.navOpenChange(true));
      dispatch(action.drawerDockedChange(true));
    } else {
      dispatch(action.drawerDockedChange(false));
    }
  };
  return {
    _requestChange: function (open) {
      dispatch(action.navOpenChange(open));
    },
    _nestedListToggle: function (itemId) {
      dispatch(action.mainLoadHtml(itemId))
    },
    _nestedItemRightIconTap: function (itemId) {
      dispatch(action.navDelMd(itemId));
    }
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