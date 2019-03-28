import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce'; 
import moment from 'moment';
import { TextArea,
          ComboBox
        } from 'carbon-components-react';

import {fetchForecast,fetchForecastByCityId,updateSearchString,searchCitiesByString
     } from '../../reducers/ForecastReducer'
import Page from '../App/Page';

import './ForecastSearch.css';
import { ForecastCards } from './ForecastCards'
import Chart from './Chart'

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

        if( search !== this.state.previousSearch){
            console.log("query:", search);
            this.props.searchCitiesByString(search);
            this.setState({previousSearch:search});
        }

    }, 1300);

    onSelectedCity=(selectedCity)=>{     
        if(!!selectedCity){
            this.props.fetchForecastByCityId(selectedCity.id);
            this.setState({isSearchSelectedItem: true})
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
    
         return <ForecastCards forecastObj={forecast} />; 
    }
  }

    

    filterCityName = (ob)=>{
         const {item,itemToString,inputValue} = ob; 
        //  console.log("item", item); 
        //  console.log("itemToString", itemToString); 
        //  console.log("inputValue", inputValue); 
         return item.name.toLowerCase().startsWith(inputValue.toLowerCase());
    }

    render() {
        
        return (
        <Page {...this.props} >

            {/*   Main Grid - begin */}
            <div className="bx--grid">

            {/*   Page Title  */}
            <div className="bx--row" >
            
                <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4">
                
                </div>
                
                <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4" style={{textAlign: 'center'}}>
                <span className="bx--type-beta">Search for the Weather Forecast</span>
                </div>
                
                <div className="bx--col-xs-4 bx--col-md-4 bx--col-lg-4">
                
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
                    <div className="bx--col-xs-3 bx--col-md-3 bx--col-lg-3">              
                </div>
                            
                <div className="bx--col-xs-6 bx--col-md-6 bx--col-lg-6">
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
                <div className="bx--col-xs-3 bx--col-md-3 bx--col-lg-3">
                </div>  
                </div>

            <div className="bx--row">
                <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
                <div className="app-spacer" />                   
                </div>
                
            </div>            

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
            
            <div className="bx--row">
                <div className="bx--col-xs-12 bx--col-md-12 bx--col-lg-12">
                    <div className="app-spacer" />
           
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
    filteredCities : state.forecast.filteredCities
  }),
  {
    fetchForecast,fetchForecastByCityId,updateSearchString,searchCitiesByString
  }
)(ForecastSearch);
