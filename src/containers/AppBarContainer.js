/**
 * Created by xdj on 2017/4/25.
 */
import React from 'react';
import {connect} from "react-redux";
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as action from '../actions';
{/*<Paper zDepth={1}>*/
}
{/*</Paper>*/
}
let AppBar = function ({dispatch}) {
  return (

    <div style={{
      position: 'fixed',
      width: '100%',
      zIndex: 1,
    }}>
      <Toolbar
        title=""
        style={{backgroundColor: '#00bcd4',}}>

        <ToolbarGroup firstChild={true}>
          <IconButton onTouchTap={function () {
            dispatch(action.navOpenChange(true));
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
              dispatch(action.loginOpenChange(true));
            }}/>
          <MenuItem
            primaryText="新建"
            style={{color: 'white'}}
            onTouchTap={function () {
              dispatch(action.addMdOpenChange(true));
            }}/>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color='white'/></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Send feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>

        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

AppBar = connect()(AppBar);
export default AppBar;