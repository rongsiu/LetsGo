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
		  <Link to="/trips" class="nav_text">Home</Link>
		</nav>
		{props.children}
	</div>

export default Nav;