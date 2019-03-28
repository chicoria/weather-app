
import React, { Component } from 'react';
import Page from "./Page";

export default class NotFound extends Component {

    render() {
  
      return (
        <Page {...this.props} >

        {/*   Main Grid - begin */}
        <div className="bx--grid">

        {/*   Page Title  */}
        <div className="bx--row">
          <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
            <span className="bx--type-beta">The requested resource was not found.</span>
          </div>
        </div>
        <br/>
        </div>        
        </Page>
      );
    }
  }