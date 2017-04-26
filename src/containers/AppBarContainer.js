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
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

AppBar = connect()(AppBar);
export default AppBar;