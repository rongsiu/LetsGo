import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Nav = props => 
	<div>
		<nav class="container navbar header">
		  <span id="logo">LetsGo</span>
		  <button>
		    <Link to="/trips">Home</Link>
		  </button>
		</nav>
		{props.children}
	</div>

export default Nav;