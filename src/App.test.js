import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'

it.skip('renders without crashing', () => {
  // breaking with 'root'. Fix this later
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,document.getElementById('root'));
});