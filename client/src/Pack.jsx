import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';

class Pack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			shared_items: [],
			favor_items: [],
			personal_items: [],
		}

		this.addItems = this.addItems.bind(this);
	}

//HARDCODED
	componentWillMount() {
		this.trip = this.props.location.pathname.split('/')[2];
		this.dates = this.props.location.state.dates;
		// this.trip = 'canada'
		// this.dates = 'jan'
		this.trip_id = '1'
	}

	componentDidMount() {

		axios.get(`http://localhost:3005/api/shared/${this.trip_id}`)
			.then(response => {
				this.setState({
					shared_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/favor/${this.trip_id}`)
			.then(response => {
				this.setState({
					favor_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/personal/${this.trip_id}`)
			.then(response => {
				this.setState({
					personal_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	addItems(e, type, trip_id, item, added_by) {
		e.preventDefault();
		console.log('test', type, trip_id, item, added_by)
		axios.post(`/api/pack/${type}`, {
			trip_id,
			item,
			added_by,
		})
		.then(response => {
			this.setState(prevState => ({
				[type]: [...prevState[type], {item: response.data.item}]
				})
			)
		})
		.catch(error =>
			console.log(error))
	}

//UPDATED ADDED BY onClick- HARDCODED NOW
  render() {
		return (
			<div>
				<div className="row">
					<span>{this.trip}</span>
					<span>{this.dates}</span>
				</div>

				<div>
					<div className="row">
						<h3 className="col-sm-6">Shared</h3>
						<form>
							<input type="text" id="shared"/>
							<input type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'shared_items', this.trip_id, $('#shared').val(), 'rachel')}/>
						</form>
					</div>
						{this.state.shared_items.map(item =>
							<div>
							{item.item} 
							<i className="fas fa-check-circle"></i>
							</div>
						)}

					<div className="row">
						<h3 className="col-sm-6">Favors</h3>
						<form>
							<input type="text" id="favor"/>
							<input type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'favor_items', this.trip_id, $('#favor').val(), 'rachel')}/>
						</form>
					</div>
						{this.state.favor_items.map(item => 
							<div>
							{item.item}
							<i className="fas fa-check-circle"></i>
							</div>
						)}

					<div className="row">
						<h3 className="col-sm-6">Personal</h3>
						<form>
							<input type="text" id="personal"/>
							<input type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'personal_items', this.trip_id, $('#personal').val(), 'rachel')}/>
						</form>
					</div>
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
