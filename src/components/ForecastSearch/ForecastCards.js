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
import Chart from './Chart'

var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale); 


export class ForecastCards extends Component {
 
    // state ={
    //     forecast : {}
    // }

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
        const forecast = this.props.forecastObj !==undefined ? this.props.forecastObj : {} ; 
             
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
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12 forecast-cards-container">
                {cards}
            </div>
         </div>
      );
    }
  }

  export default connect(
    (state) => ({
      forecast : state.forecast.forecastData,
    }),{}
  )(ForecastCards);
  

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
            <Chart date={moment.unix(date).format("L")} forecast={forecastList} />
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
  
  