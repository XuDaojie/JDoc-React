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
let AppBar = function ({
                         title, loginStyle, addMdStyle, _menuOnClick, _loginOnClick,
                         _sharedOnClick, _addMdOnClick, _signOutOnClick
                       }) {
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
          <IconButton onTouchTap={_menuOnClick}>
            <FontIcon className="material-icons" color="white">menu</FontIcon>
          </IconButton>
          <ToolbarTitle text={title} style={{color: 'white'}}/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <MenuItem
            primaryText="登陆"
            style={loginStyle}
            onTouchTap={_loginOnClick}/>
          <MenuItem
            primaryText="分享"
            style={addMdStyle}
            onTouchTap={_sharedOnClick}/>
          <MenuItem
            primaryText="新建"
            style={addMdStyle}
            onTouchTap={_addMdOnClick}/>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color='white'/></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh"/>
            <MenuItem primaryText="Send feedback"/>
            <MenuItem primaryText="Settings"/>
            <MenuItem primaryText="Help"/>
            <MenuItem primaryText="Sign out"
                      onTouchTap={_signOutOnClick}/>
          </IconMenu>

        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

AppBar.propTypes = {
  title: React.PropTypes.string,
  loginStyle: React.PropTypes.object,
  addMdStyle: React.PropTypes.object,

  _menuOnClick: React.PropTypes.func,
  _loginOnClick: React.PropTypes.func,
  _sharedOnClick: React.PropTypes.func,
  _addMdOnClick: React.PropTypes.func,
  _signOutOnClick: React.PropTypes.func,
};

// 读取state
const mapStateToProps = function (state) {
  return {
    title: state.appBar.title,
    loginStyle: state.appBar.loginStyle,
    addMdStyle: state.appBar.addMdStyle,
  }
};

// 分发state
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    _menuOnClick: function () {
      dispatch(action.navOpenChange(true));
    },
    _loginOnClick: function () {
      dispatch(action.loginOpenChange(true));
    },
    _sharedOnClick: function () {
      dispatch(action.sharedOpenChange(true));
    },
    _addMdOnClick: function () {
      dispatch(action.addMdOpenChange(true));
    },
    _signOutOnClick: function () {
      dispatch(action.signOut());
      location.reload(false);
      // dispatch(action.init());
    }
  };
};

AppBar = connect(mapStateToProps, mapDispatchToProps)(AppBar);
export default AppBar;