/**
 * Created by xdj on 2017/4/25.
 */
import React from 'react';
import {connect} from "react-redux";
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import * as AppBarAction from '../actions/AppBarAction';

let AppBar = function ({dispatch}) {
  return (
    <Paper zDepth={1}>
      <Toolbar
        title=""
        style={{backgroundColor: '#00bcd4'}}>

        <ToolbarGroup firstChild={true}>
          <IconButton onTouchTap={function () {

          }}>
            <FontIcon className="material-icons" color="white">menu</FontIcon>
          </IconButton>
          <ToolbarTitle text="Toolbar" style={{color: 'white'}}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <MenuItem
            primaryText="登陆"
            style={{color: 'white'}}
            onTouchTap={function () {
              dispatch(AppBarAction.loginOpenChange(true));
            }}/>
        </ToolbarGroup>
      </Toolbar>
    </Paper>
  );
};

// class AppBar extends React.Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   leftIconClick() {
//   }
//
//   rightIconClick({dispatch}) {
//     dispatch(AppBarAction.loginOpenChange(true));
//   }
//
//   render() {
//     console.log(new TestLoginDialog());
//     return (
//       <Paper zDepth={1}>
//         <Toolbar
//           title=""
//           style={{backgroundColor: '#00bcd4'}}>
//
//           <ToolbarGroup firstChild={true}>
//             <IconButton onTouchTap={this.leftIconClick.bind(this)}>
//               <FontIcon className="material-icons" color="white">menu</FontIcon>
//             </IconButton>
//             <ToolbarTitle text="Toolbar" style={{color: 'white'}}/>
//           </ToolbarGroup>
//           <ToolbarGroup lastChild={true}>
//             <MenuItem
//               primaryText="登陆"
//               style={{color: 'white'}}
//               onTouchTap={this.rightIconClick.bind(this)}/>
//           </ToolbarGroup>
//         </Toolbar>
//       </Paper>
//     );
//   }
// }
AppBar = connect()(AppBar);
export default AppBar;