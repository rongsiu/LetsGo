import App from './App.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

// ReactDOM.render(<App />, document.getElementById('app'));

window.renderDOM = function renderDOM(user) {
	console.log('rendering', user)
	ReactDOM.render(<App user={user} />, document.getElementById('app'));
}