import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

const Nav = props => 
	<div>
		<nav className="header">
			<div id="logo">
			  <span >Letsg</span>
				<i className="fas fa-map-marker-alt"></i>
			</div>
			<div className="nav_text">
			  <Link to="/trips">Trips</Link>
		  </div>
		</nav>
		{props.children}
	</div>

export default Nav;