import {
    getForecast, getForecastByCityId, getCities, getWeatherByCityId
} from '../lib/OpenWeatherService';

const initState = {
    cities : [],
    filteredCities :[],
    forecastData: {},
    searchForm : {
        search : ""
    },
    searchForecastStatus : FORECAST_SEARCH_FORECAST_STATUS_INITIAL,
    currentWeather : {}
}

export const FORECAST_SEARCH_FORECAST_STATUS_INITIAL = 'FORECAST_SEARCH_FORECAST_STATUS_INITIAL';
export const FORECAST_SEARCH_FORECAST_STATUS_SEARCHING = 'FORECAST_SEARCH_FORECAST_STATUS_SEARCHING';
export const FORECAST_SEARCH_FORECAST_STATUS_DONE = 'FORECAST_SEARCH_FORECAST_STATUS_DONE';


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

const FORECAST_SEARCH_FORECAST_STATUS = 'FORECAST_SEARCH_FORECAST_STATUS' ;
export const updateSearchForecastStatusAction = (status) => ({type: FORECAST_SEARCH_FORECAST_STATUS, payload: status })

const FORECAST_LOAD_WEATHER_DATA = 'FORECAST_LOAD_WEATHER_DATA';
export const loadWeatherData = (data) => ({type: FORECAST_LOAD_WEATHER_DATA, payload: data})

export const updateSearchForecastStatus=  (status) => {
    return  (dispatch, getState) => {
        dispatch(updateSearchForecastStatusAction(status));      
    }
}

export const fetchWeatherByCityId=  (cityId) => {
    return  (dispatch, getState) => {
        getWeatherByCityId(cityId)
            .then(weather => dispatch(loadWeatherData(weather)))        
    }
}

export const fetchForecast =  (city) => {
    return  (dispatch, getState) => {
            getForecast(city)
            .then(forecastData => dispatch(loadForecastData(forecastData)))        
    }
}

export const fetchForecastByCityId =  (cityId) => {
    return  (dispatch, getState) => {
        dispatch(updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_SEARCHING)); 
    
        getForecastByCityId(cityId)
            .then(forecastData => dispatch(loadForecastData(forecastData)))
            .then(dispatch(updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_DONE)))     ; 
    }
}

export const searchCitiesByString = (searchString) => {
    return (dispatch, getState) => {
      let cities = getState().forecast.cities;
      let filteredCities = [];
       
      if(cities.length > 0 ) {
        //look the cities in the local state
        filteredCities = cities.filter(city => city.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
        //if there match 
        if(filteredCities.length > 0){
            dispatch(loadFilteredCities(filteredCities)) ;
            //dispatch(updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_DONE)); 
        }else {
            getCities(searchString)
            .then(newCities => {
                dispatch(loadFilteredCities(newCities));
                dispatch(addCities(newCities)); 
                //dispatch(updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_DONE)); 
            });
        }
      }else {
        getCities(searchString)
        .then(newCities => {
            dispatch(loadFilteredCities(newCities));
            dispatch(addCities(newCities)); 
            //dispatch(updateSearchForecastStatus(FORECAST_SEARCH_FORECAST_STATUS_DONE)); 
        });
    }
    
  
    }
  }

  export const updateSearchString = ( search) => {
  return (dispatch) => {
    dispatch(updateSearchFormStringAction(search ));
  }
}  





export default (state = initState, action) => {
    switch (action.type) {

        case FORECAST_SEARCH_FORECAST_STATUS:
            return {
            ...state,
            searchForecastStatus: action.payload
        };

        case FORECAST_LOAD_DATA:
            return {
                ...state,
                forecastData: action.payload
        };

        case FORECAST_LOAD_WEATHER_DATA:
            return {
                ...state,
                currentWeather: action.payload
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
        } ;   
        
        case FORECAST_LOAD_FILTERED_CITIES:
        return {
            ...state,
            filteredCities: action.payload
        };          

        default:
            return state
    }
}