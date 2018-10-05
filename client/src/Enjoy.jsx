import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GMap from './GMap.jsx';
import { Link } from "react-router-dom";

class Enjoy extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.trip = this.props.location.pathname.split('/')[2];
    this.trip_id = this.props.location.pathname.split('/')[3];
  }

	render() {
		return(
			<div className="container">
				<div className="pack_nav">
				<h2>{this.trip}</h2>
	      <Link to={{ pathname: '/trips'}}>
	        <div><i className="icon fas fa-home fa-lg"></i></div>
	      </Link>  
				<Link to={{ pathname: `/pack/${this.trip}/${this.trip_id}`}}>
				<div><i className="icon fas fa-suitcase fa-lg"></i></div>
				</Link>    
				<Link to={{ pathname: `/savor/${this.trip}/${this.trip_id}`}}>
				<div><i className="icon fas fa-images fa-lg"></i></div>
				</Link>
				</div>
				<GMap />
			</div>
		)
	}
}

export default Enjoy;