
import React, { Component } from 'react';
import SideMenu from "./SideMenu";

export default class Page extends Component {

    render() {
  
      return (
        <div>
        <SideMenu {...this.props} />
        {this.props.children}
        </div>
      );
    }
  }