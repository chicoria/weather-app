import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {composeWithDevTools} from 'redux-devtools-extension'

import ForecastReducer from './reducers/ForecastReducer';
import AppReducer from './reducers/AppReducer';

const reducer = combineReducers({
    app: AppReducer,
    forecast : ForecastReducer
  })

export default createStore(reducer,
    composeWithDevTools(
        applyMiddleware(logger, thunk)
      )
);
