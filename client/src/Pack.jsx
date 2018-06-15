import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

class Pack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			shared_items: [],
			favor_items: [],
			personal_items: [],
		}
	}

	componentWillMount() {
		this.trip = this.props.location.pathname.split('/')[2];
		this.dates = this.props.location.state.dates;
	}

	componentDidMount() {

		axios.get(`http://localhost:3005/api/shared/${this.trip}`)
			.then(response => {
				this.setState({
					shared_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/favor/${this.trip}`)
			.then(response => {
				this.setState({
					favor_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/personal/${this.trip}`)
			.then(response => {
				this.setState({
					personal_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

  render() {
		return (
			<div>
				<div className="row">
					<span>{this.trip}</span>
					<span>{this.dates}</span>
				</div>

				<div>
					<div className="row"><h3 className="col-sm-6">Shared</h3><i className="col-sm-6 fas fa-plus"></i></div>
						{this.state.shared_items.map(item =>
							<div>
							{item.item} 
							<i className="fas fa-check-circle"></i>
							</div>
						)}

					<div className="row"><h3 className="col-sm-6">Favors</h3><i className="col-sm-6 fas fa-plus"></i></div>
						{this.state.favor_items.map(item => 
							<div>
							{item.item}
							<i className="fas fa-check-circle"></i>
							</div>
						)}

					<div className="row"><h3 className="col-sm-6">Personal</h3><i className="col-sm-6 fas fa-plus"></i></div>
					<div className="row">
						<div className="col-md-4">Self</div>
						<div className="col-md-4">Claimed Group</div>
						<div className="col-md-4">Claimed Favor</div>
					</div>
					<div className="row">
						<ul className="col-md-4">
							{this.state.personal_items.map(item => 
								<li>
								{item.item}
								<i className="fas fa-check-circle"></i>
								</li>
							)}
						</ul>
						<ul className="col-md-4">
							{this.state.personal_items.map(item => 
								<li>
								{item.item}
								<i className="fas fa-check-circle"></i>
								</li>
							)}
						</ul>
						<ul className="col-md-4">
							{this.state.personal_items.map(item => 
								<li>
								{item.item}
								<i className="fas fa-check-circle"></i>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div> 
		)}
};

export default Pack;
