import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

const Nav = props => 
	<div>
		<nav class="header">
			<div id="logo">
			  <span >Letsg</span>
				<i class="fas fa-map-marker-alt"></i>
			</div>
			<div class="nav_text">
			  <Link to="/trips">Home</Link>
			  <Link to="/pack">Pack</Link>
			  <Link to="/photos">Photos</Link>
		  </div>
		</nav>
		{props.children}
	</div>

export default Nav;