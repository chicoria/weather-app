import React, {Component} from 'react';
import moment from 'moment';

import {Tile,
        StructuredListWrapper,
        StructuredListBody,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell
} from 'carbon-components-react';
import ForecastChart from './ForecastChart'

var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale); 


export class ForecastCards extends Component {
    
    render(){
        const forecast = this.props.forecastObj !==undefined ? this.props.forecastObj : {} ; 
        const weather = this.props.currentWeather !==undefined ? this.props.currentWeather : {} ; 
        let cards = []; 

        if ( forecast!== undefined 
            && forecast.list!== undefined ) {
            
        let forecastDays =  forecast.list ; 
        let lastDate  ; 
         
        forecastDays.forEach(( forecastDay, count) =>{
            
            let currentDate = moment.unix(forecastDay.dt).format("LL") ; 

            if(currentDate !== lastDate ){  
                //get the all forecast record - one record for each time available
                let allForecastsForSameDate = forecastDays.filter(f => moment.unix(f.dt).format("LL") === currentDate);

                cards.push(<ForecastCard 
                            key={count} 
                            date={forecastDay.dt} 
                            forecastList={allForecastsForSameDate}
                            />); 
            }
            lastDate =currentDate; 
        });

    }   

    return (
        <div className="bx--row">
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">     
                <Tile>          
                        <div className="bx--row">
                            <div className="bx--col-xs-3 bx--col-md-3 bx--col-lg-3">                        
                                <span className="bx--type-alpha" style={{fontWeight:600}}>{forecast.city.name}</span>
                                <span className="bx--type-alpha" >, {forecast.city.country}</span><br/>
                                <span className="bx--type-caption" >(lon:{forecast.city.coord.lon} | lat:{forecast.city.coord.lat})</span>
                            </div>

                            <div className="bx--col-xs-9 bx--col-md-9 bx--col-lg-9 ">
                                <div className="bx--row">
                                    <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                        <span className="bx--type-legal" >temperature</span><br/>
                                        <span className="bx--type-alpha" >{weather.main.temp} ºC</span><br/>                                            
                                        <span className="bx--type-caption">min:</span>
                                        <span className="bx--type-omega"> {weather.main.temp_min}ºC</span><br/>
                                        <span className="bx--type-caption">  max:</span>
                                        <span className="bx--type-omega"> {weather.main.temp_max}ºC</span>
                                     </div>   
                                     <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                        <span className="bx--type-legal" >humidity</span><br/>
                                        <span className="bx--type-alpha">{weather.main.humidity}%</span><br/>
                                    </div>                                                                    
                                    <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                            <span className="bx--type-legal" >weather</span><br/>
                                            <span className="bx--type-alpha" >{weather.weather[0].main} </span><br/>
                                            <span className="bx--type-caption" >{weather.weather[0].description}</span>
                                    </div> 
                                    <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                         <span className="bx--type-legal" >wind</span><br/>
                                        <span className="bx--type-alpha" >{weather.wind.speed} Km/h </span><br/>
                                        <span className="bx--type-caption" >{weather.wind.deg}º</span>
                                    </div>  
                                    <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                        <span className="bx--type-legal" >sunset</span><br/>
                                        <span className="bx--type-alpha" >{moment.unix(weather.sys.sunrise).format("HH:mm:ss")}</span>
                                    </div>   
                                    
                                    <div className="bx--col-xs-2 bx--col-md-2 bx--col-lg-2">
                                        <span className="bx--type-legal" >sunset</span><br/>
                                        <span className="bx--type-alpha" >{moment.unix(weather.sys.sunset).format("HH:mm:ss")}</span>
                                    </div>                                     
                                                       
                                </div>     
                             </div>                            

                      
                    </div> 
                </Tile>                     
                <div className="bx--row">
                    <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12 forecast-cards-container">
                        {cards}
                    </div>
                </div>                              
            </div>
         </div>        

      );
    }
  }

  export default ForecastCards;
  

export class ForecastCard extends Component {
    componentDidMount=()=> {
    }

    componentWillReceiveProps=(nextProps)=> {
    }

    render(){
    const {date, forecastList} = this.props;
    const forecastCardTemperatureOnTimeList = forecastList.map( (f,index) => <ForecastCardTemperatureOnTime key={index} forecast={f}/>)
    

    return (
        <Tile className="forecast-card-item">
            <div >
                <span className="bx--type-gamma">{moment.unix(date).format("L")}</span>
            </div>
            <div className="app-spacer" />
            <ForecastChart date={moment.unix(date).format("L")} forecast={forecastList} />
            <div className="app-spacer" />
             <ForecastCardTimeSection forecastCardTemperatureOnTimeList={forecastCardTemperatureOnTimeList}/>
                   
        </Tile>          
      );
    }
  }


export class ForecastCardTemperatureOnTime extends Component {
    componentDidMount=()=> {

    }

    componentWillReceiveProps=(nextProps)=> {
 
    }
    
    render(){
    const {forecast} = this.props;

    return (
    <StructuredListRow >
        <StructuredListCell >
        {moment.unix(forecast.dt).format("HH:mm")}
        </StructuredListCell>
        <StructuredListCell>
        {forecast.main.temp}
        </StructuredListCell>
        <StructuredListCell>
        {forecast.main.temp_min} 
        </StructuredListCell>
        <StructuredListCell>
        {forecast.main.temp_max} 
        </StructuredListCell> {/**

        <StructuredListCell>
        {forecast.weather.main} 
        </StructuredListCell> 
        <StructuredListCell>
        {forecast.clouds.all} 
        </StructuredListCell> 
        <StructuredListCell>
        {forecast.wind.speed} {forecast.wind.deg} 
        </StructuredListCell>  
         */}                                     
        </StructuredListRow>          
      );
    }
  }

export class ForecastCardTimeSection extends Component {
    componentDidMount=()=> {
    }

    componentWillReceiveProps=(nextProps)=> {
    }
    
    render(){
       const {forecastCardTemperatureOnTimeList} = this.props; 
      return(
        <div className="forecast-card-time-item">
        <StructuredListWrapper >
        <StructuredListHead>
            <StructuredListRow head>
                <StructuredListCell head>
                Time
                </StructuredListCell>
                <StructuredListCell head>
                Temperature ºC
                </StructuredListCell>
                <StructuredListCell head>
                Min ºC
                </StructuredListCell>
                <StructuredListCell head>
                Max ºC
                </StructuredListCell>            
            </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>   
            {forecastCardTemperatureOnTimeList}
        </StructuredListBody>
        </StructuredListWrapper>  
      {/*
        <LineGraph  
                    data={[1, 2,5,2]}
                    xAxisLabel={[1, 2,5,2]} 
                    yAxisLabel={[1, 2,5,2]}
        width="100%"/>
      */}
        </div>           
      );
    }
  }
  
  