import React, { Component } from 'react';
import {connect} from 'react-redux' ;

import {updateSideMenuState} from '../../reducers/AppReducer'; 


class PageHeader extends Component {

    openSideMenu = () => {
        this.props.updateSideMenuState(true); 
    }

    closeLeftMenu = ()  => {
        this.props.updateSideMenuState( false);
    }


    render() {
      return (
        <div className="app-header">
          <div className="app-header-branding brand-container">
            <span className="brand-title">Weather Forecast </span>
          </div>


      </div>
      );
    }
}

export default connect(
    (state) => ({
        app: state.app
    }),
    {
        updateSideMenuState,
    }
)(PageHeader);