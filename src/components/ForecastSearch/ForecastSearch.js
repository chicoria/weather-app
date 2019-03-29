import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce'; 
import moment from 'moment';
import { TextArea,
          ComboBox,
          Loading
        } from 'carbon-components-react';

import {fetchForecast,fetchForecastByCityId,
        updateSearchString,searchCitiesByString,
        fetchWeatherByCityId,updateSearchForecastStatus,
        FORECAST_SEARCH_FORECAST_STATUS_SEARCHING, 
        FORECAST_SEARCH_FORECAST_STATUS_INITIAL
     } from '../../reducers/ForecastReducer'
import Page from '../App/Page';
import './ForecastSearch.css';
import { ForecastCards } from './ForecastCards';
import ForecastChart from './ForecastChart'; 

var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale); 


class ForecastSearch extends Component {

    state ={
        isSearchSelectedItem : false,
        previousSearch : ""
    }



    componentDidMount = () => {

    }

    componentDidUpdate = () => {
    }

    componentWillReceiveProps = (nextProps) => {
    }


    onChangeSearch= debounce(search=>{
        this.props.updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_INITIAL);
        if( search !== this.state.previousSearch){
            console.log("query:", search);
            this.props.searchCitiesByString(search);
            this.setState({previousSearch:search});
        }
    
    }, 1300);

    onSelectedCity=(selectedCity)=>{     

        if(!!selectedCity){
            this.props.fetchForecastByCityId(selectedCity.id);
            this.props.fetchWeatherByCityId(selectedCity.id);
            this.props.updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_SEARCHING);
        }
        
    }

    //just for debbugging
    printForecast=()=>{
        if( this.props.forecast.forecastData!==undefined
            && this.props.forecast.forecastData.city!==undefined) {
            let text = ""; 
            this.props.forecast.forecastData.list.forEach(f =>{
                text += `dt : ${moment.unix(f.dt).format("LLL")} temp : ${f.main.temp} min : ${f.main.temp_min} max : ${f.main.temp_max} \n` ;
            })

            return text; 
    } 

    return "No forecast data"
  }

  getForecastCards=()=>{
    let forecast = this.props.forecast.forecastData; 

    if ( forecast !== undefined 
        && forecast.list!== undefined ) {
       
        let weather = this.props.weather ; 
         return <ForecastCards forecastObj={forecast} currentWeather={weather}/>; 
    }
  }
  getForecastChart=()=>{
      if(this.props.forecast.forecastData !== undefined &&
        this.props.forecast.forecastData.list !==undefined){
        return <ForecastChart  forecast={this.props.forecast.forecastData.list.map( f =>{
            return { date: moment.unix(f.dt).toDate(), temp: f.main.temp }; 
        })} />  
      }

  }

    

    filterCityName = (ob)=>{
         const {item,inputValue} = ob; 
         return item.name.toLowerCase().startsWith(inputValue.toLowerCase());
    }


    render() {

        return (
        <Page {...this.props} >

            {/*   Main Grid - begin */}
            <div className="bx--grid">

            {/*   Page Title  */}
            <div className="bx--row" >
            
                <div className="bx--col-xs-auto bx--col-md-3 bx--col-lg-3">                
                </div>
                
                <div className="bx--col-xs-auto bx--col-md-6 bx--col-lg-6" style={{textAlign: 'center'}}>
                <span className="bx--type-alpha">Search for the Weather Forecast</span>
                </div>
                
                <div className="bx--col-xs-auto bx--col-md-3 bx--col-lg-3">                
                </div>  
                                
            </div>


                {/*   space for notification info/description text */}
            <div className="bx--row">
                <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
                    <div className="app-spacer" />
                </div>
            </div>


            {/*  Title Text Input  */}
            <div className="bx--row">
                <div className="bx--col-xs-auto bx--col-md-3 bx--col-lg-3">              
            </div>
                            
            <div className="bx--col-xs-auto bx--col-md-6 bx--col-lg-6">
                <div style={{ width: '100%' }}>
                    <ComboBox                                                
                        items={this.props.filteredCities}
                        itemToString={item =>
                        item ? `${item.name}, ${item.country} - (lon:${item.coord.lon} - lat:${item.coord.lat})` : ''
                        }
                        shouldFilterItem={((obj) => this.filterCityName(obj))}                    
                        onInputChange={ (text) => this.onChangeSearch(text)}
                        onChange={ob => this.onSelectedCity(ob.selectedItem)}
                        placeholder="Oslo"
                    />                        
                </div>
            </div>
    
            <div className="bx--col-xs-auto bx--col-md-3 bx--col-lg-3">
            </div>  
        </div>            

        <div className="bx--row">
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
            <div className="app-spacer" />                   
            </div>                
        </div>            

        <Loading 
            active={this.props.searchForecastStatus === FORECAST_SEARCH_FORECAST_STATUS_SEARCHING}
            withOverlay={true} />
        
        {this.getForecastCards()}

        {/*   space for notification info/description text */}
        <div className="bx--row">
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
                <div className="app-spacer" />
            </div>
        </div>

        {/*   space  */}
        <div className="bx--row" style={{display:'none'}}>
            <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
            <div className="spaceBetweenFormTitleAndFormDescription" />
            < TextArea 
            labelText="Result"
            value={this.printForecast()}/>
            <div className="spaceBetweenFormTitleAndFormDescription" />
            </div>
        </div>   
            
                                
            </div> 
        </Page>
        );
    }
}

export default connect(
  (state) => ({
    searchForm: state.forecast.searchForm,
    forecast : state.forecast,
    weather : state.forecast.currentWeather,
    filteredCities : state.forecast.filteredCities,
    searchForecastStatus : state.forecast.searchForecastStatus,
  }),
  {
    fetchForecast,fetchForecastByCityId,
    updateSearchString,searchCitiesByString,
    fetchWeatherByCityId,updateSearchForecastStatus
  }
)(ForecastSearch);
