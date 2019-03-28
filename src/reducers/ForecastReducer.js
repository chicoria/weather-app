import {
    getForecast, getForecastByCityId, getCities
} from '../lib/OpenWeatherService';

const initState = {
    cities : [],
    filteredCities :[],
    forecastData: {},
    searchForm : {
        search : ""
    }
}

const FORECAST_LOAD_DATA = 'FORECAST_LOAD_DATA';
export const loadForecastData = (data) => ({type: FORECAST_LOAD_DATA, payload: data})

const FORECAST_LOAD_CITIES = 'FORECAST_LOAD_CITIES';
export const loadCities = (cities) => ({type: FORECAST_LOAD_CITIES, payload: cities});

const FORECAST_ADD_CITIES = 'FORECAST_ADD_CITIES';
export const addCities = (newCities) => ({type: FORECAST_ADD_CITIES, payload: newCities})

const FORECAST_LOAD_FILTERED_CITIES = 'FORECAST_LOAD_FILTERED_CITIES';
export const loadFilteredCities = (cities) => ({type: FORECAST_LOAD_FILTERED_CITIES, payload: cities})

const FORECAST_SEARCH_FORM_UPDATE = 'FORECAST_SEARCH_FORM_UPDATE' ;
export const updateSearchFormStringAction = (searchString) => ({type: FORECAST_SEARCH_FORM_UPDATE, payload: searchString })


export const fetchForecast =  (city) => {
    return  (dispatch, getState) => {
        let currentForecastData = getState().forecast.forecastData;
    
        getForecast(city)
            .then(forecastData => dispatch(loadForecastData(forecastData)))        
    }
}

export const fetchForecastByCityId =  (cityId) => {
    return  (dispatch, getState) => {
        let currentForecastData = getState().forecast.forecastData;
    
        getForecastByCityId(cityId)
            .then(forecastData => dispatch(loadForecastData(forecastData)))        
    }
}

export const searchCitiesByString = (searchString) => {
    return (dispatch, getState) => {
      let cities = getState().forecast.cities;
      let filteredCities = [];
      //dispatch(updateSearchFormStringAction(searchString));
  
      if(cities.length > 0 ) {
        //look the cities in the local state
        filteredCities = cities.filter(city => city.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
        //if there match 
        if(filteredCities.length > 0){
            dispatch(loadFilteredCities(filteredCities)) ;
        }else {
            getCities(searchString)
            .then(newCities => {
                dispatch(loadFilteredCities(newCities));
                dispatch(addCities(newCities)); 
            });
        }
      }else {
        getCities(searchString)
        .then(newCities => {
            dispatch(loadFilteredCities(newCities));
            dispatch(addCities(newCities)); 
        });
    }
  
    }
  }

// export const getFilteredCities = (state) => {
//     let citiesFiltered  = [];
//     let cities = state.forecast.environmentBySearch;
//     let searchString = state.forecast.searchString;
//     let searchOptionSelected = state.environment.searchForm.searchOptionSelected;
  
//     console.log("getFilteredCitiesList.searchString" ,searchString );
  
//     if( searchString!== undefined && searchString.length < 4 ) {
//         cities = state.forecast.cities;
//     }
  
  
//     const {filterByMainOptionSelected ,filterByOptions} = state.environment.filterByForm;
  
//       if(filterByMainOptionSelected === 'environmentType'){
//         environmentsFiltered =  environments.filter(
//           environment=> filterByOptions.some(option => option.id===environment.environmentType && option.selected)
//         );
//       }else {
//         environmentsFiltered =  environments.filter(
//           environment=> filterByOptions.some(option => option.id===environment.customerType && option.selected)
//         );
//       }
  
//     return environmentsFiltered;
  
//   }

  export const updateSearchString = ( search) => {
  return (dispatch) => {
    dispatch(updateSearchFormStringAction(search ));
  }
}  



export default (state = initState, action) => {
    switch (action.type) {

        case FORECAST_LOAD_DATA:
            return {
                ...state,
                forecastData: action.payload
            };

         
        case FORECAST_SEARCH_FORM_UPDATE:
        return {...state,
            searchForm: {
              ...state.searchForm,
              search: action.payload 
            }
        };
              
        case FORECAST_LOAD_CITIES:
        return {
            ...state,
            cities: action.payload
        };   
        
        case FORECAST_ADD_CITIES:
        return {...state,
              cities: [...state.cities, ...action.payload]
          }       
        
        case FORECAST_LOAD_FILTERED_CITIES:
        return {
            ...state,
            filteredCities: action.payload
        };          

        default:
            return state
    }
}