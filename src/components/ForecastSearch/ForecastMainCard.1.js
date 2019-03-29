import React, {Component} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {Tile,
        StructuredListWrapper,
        StructuredListBody,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell
} from 'carbon-components-react';
import { LineGraph , BarGraph} from "carbon-addons-data-viz-react";

var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale); 


export class ForecastMainCard extends Component {
 
    state ={
        forecastObj : {},
        forecastByDate : [{
            date :  "22/10/2019",
            data : { list :[], city:{}} 
        }],
        currentForecast : {
            date :  "22/10/2019",
            data : { list :[], city:{}} 
        }
    }

    // componentDidMount=()=>{
    //     if(this.props.forecastObj !== undefined &&
    //          this.props.forecastObj.city !== undefined){
    //         this.setState({forecast : this.props.forecastObj}); 
    //     }
    // }

    // componentWillReceiveProps=(nextProps)=>{
    //     if(nextProps.forecastObj !== this.props.forecastObj){
    //         this.setState({forecast : nextProps.forecastObj}); 
    //     }
    // }
    
    
    render(){
        const currentForecast = this.state.currentForecast;
       

    return (
          <div className="bx--row">
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">  
                {/** City Name */}    
                <div className="bx--row">
                    <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12"> 
                        {forecast.city.name}               
                    </div>
                </div>  
                {/** Current Weather condition Cloud/Clear */}   
                <div className="bx--row">
                    <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
                        {currentForecast.city.name}                  
                    </div>
                </div>  
                <div className="bx--row">
                    {/** Temperature */} 
                    <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4">  
                        <div className="bx--row">
                            <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">  
                            {currentForecast.city.name}                
                            </div>
                            <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">                
                            </div>                            
                        </div> 
                    </div>
                    <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4">  
                                      
                    </div>
                    <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4">  
                                      
                    </div>
                </div>                           
            </div>
         </div>
      );
    }
  }

  export default connect(
    (state) => ({
      forecast : state.forecast.forecasData,
    }),{}
  )(ForecastMainCard);
  