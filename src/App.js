import 'carbon-components/scss/globals/scss/styles.scss';

import React, { Component } from 'react';
import PageHeader from './components/App/PageHeader';
import NotFound from './components/App/NotFound';
import {connect} from 'react-redux' ;

import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
 
import ForecastSearch from './components/ForecastSearch/ForecastSearch'
import './App.scss';


class App extends Component {

  componentDidMount = () => {
  
  }



  render () {


    return (
        <div className="app">

            <PageHeader />
            <main id="content" className="app-main-content">
                <Router>
                     <Switch >

                        <Route exact path="/"component={ForecastSearch} />
                        
                        <Route exact path="/forecast"component={ForecastSearch} />
                  
                        <Route path="*" component={NotFound}/>
                        
                    </Switch>
                 </Router>
            </main>
        </div>

    );
  }
}

export default  connect(
  (state)=> ({

  }),
    {}
)(App);
