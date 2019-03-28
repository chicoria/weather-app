import React, { Component } from 'react';
import {connect} from 'react-redux' ;

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import closeIcon from './icons/close.svg';

import dashIcon from './icons/dashboard.svg';
import userIcon from './icons/user.svg';
import {updateSideMenuState} from '../../reducers/AppReducer'
import { Link}from 'react-router-dom';


class SideMenu extends Component {

    openSideMenu = () => {
        this.props.updateSideMenuState(true);
    }

    closeLeftMenu = ()  => {
        this.props.updateSideMenuState( false);
    }

    renderAdministratorMenus=()=>{
        if(this.props.user.userLoggedInfo !== undefined &&
            this.props.user.currentAccess !== undefined &&
            this.props.user.currentAccess.roleId === 'Administrator'){
            return (
                <Link to="/rolemanagement">
                    <MenuItem
                            onClick={this.closeLeftMenu}
                            style={{borderTop:'0.5px solid #E2DDDD', borderBottom:'0.5px solid #E2DDDD',fontFamily: 'IBM Plex Sans', fontSize: '14px'}}
                            >
                            <img src={userIcon} style ={{paddingTop:'10px'}} alt="User Management"/>User Management
                    </MenuItem>
                 </Link>                
            );
        }
      }    


    render() {

        const menuItemStyle = {borderTop:'0.5px solid #E2DDDD', fontFamily: 'IBM Plex Sans', fontSize: '14px'};
        const menuItemHeaderStyle = {borderTop:'1px solid #E2DDDD', 	borderBottom: '0.5px solid #4A90E2', fontFamily: 'IBM Plex Sans', fontSize: '14px'};

      return (
        <div>
            <MuiThemeProvider>
            <Drawer  open={this.props.app.sideMenuOpened} onRequestChange={this.closeLeftMenu} >

                    <div >
                        <MenuItem style={{minHeight :'35px', height:'35px' }}
                        onClick={this.closeLeftMenu}  ><img src={closeIcon}  style={{marginLeft: '200px', marginTop:'10px'}} alt="close"/></MenuItem>

                        <Link to="/forecast">
                            <MenuItem
                                onClick={this.closeLeftMenu}
                                style={menuItemHeaderStyle}>
                                <img src={dashIcon} style ={{paddingTop:'10px'}} alt="Dashboard"/>
                                Weather Forecast Search
                            </MenuItem>
                        </Link>

       
                       
            
                    </div>

                </Drawer>
                </MuiThemeProvider>
            </div>
      );
    }
}

export default connect(
    (state) => ({
        user: state.user ,
        app: state.app

    }),
    {
        updateSideMenuState,
    }
)(SideMenu);
