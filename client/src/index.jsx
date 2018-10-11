import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import App from './components/App.jsx'
import { getAllTrips } from './actions/index';

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch(getAllTrips());

ReactDOM.render(
	<Provider store={store}>
    <App />
  </Provider>, 
	document.getElementById('app')
);

