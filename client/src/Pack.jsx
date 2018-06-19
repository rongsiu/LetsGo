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

		// this.addItems = this.addItems.bind(this);
		// this.claimItems = this.claimItems.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}

//HARDCODED
	componentWillMount() {
		this.trip = this.props.location.pathname.split('/')[2];
		this.dates = this.props.location.state.dates;
		// this.trip = 'canada'
		// this.dates = 'jan'
		this.trip_id = this.props.location.pathname.split('/')[3];
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
		axios.post(`/api/pack/${type}`, {
			trip_id,
			item,
			added_by,
		})
		.then(response => {
			let id = response.data.row.split(',')[1].substring(0, response.data.row.split(',')[1].length-1);
			this.setState(prevState => ({
				[type]: [...prevState[type], {item, added_by, id}]
				})
			)
		})
		.catch(error =>
			console.log(error))
	}

	claimItems(e, type, trip_id, id, claimed_by) {
		console.log('called', type, trip_id, id, claimed_by)
		e.preventDefault();
		axios.patch(`/api/pack/${type}`, {
			trip_id,
			id,
			claimed_by
		})
		.then(response => {
			console.log(response)
			this.setState(prevState => {
				let newState = [...prevState[type]];
				for(let i = 0; i < newState.length; i++) {
					if(newState[i].id.toString() === id) {
						console.log('afaef',newState[i])
						newState[i].claimed_by = claimed_by
						console.log(newState)
					}
				}
				return {
					[type]: newState
				}
			})
		})
		.catch(error =>
			console.log(error)
		)
	}

//ADD STYLE CHANGE
	changeColor() {
		 $(".unchecked").toggleClass("checked");
	}

//UPDATED ADDED BY onClick- HARDCODED NOW CLAIMED BY hardcoded
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
							<i className="fas fa-check-circle" id={item.id} onClick={(e)=> this.claimItems(e, 'shared_items', this.trip_id, e.target.id,'rachel')}></i>
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
							<i className="fas fa-check-circle" id={item.id} onClick={(e)=> this.claimItems(e, 'favor_items', this.trip_id, e.target.id,'rachel')}></i>
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
							{this.state.shared_items.map(item => {
								if(item.claimed_by ==='rachel') {
									return (
									<li>
									{item.item}
									<i className="fas fa-check-circle"></i>
									</li>)
								}}
							)}
						</ul>
						<ul className="col-md-4">
							{this.state.favor_items.map(item => {
								if(item.claimed_by ==='rachel') {
									return (
									<li>
									{item.item}
									<i className="fas fa-check-circle"></i>
									</li>)
								}}
							)}						
						</ul>
						<div>
						Your favor
							{this.state.favor_items.map(item => {
								 console.log('check', item)
								if(item.added_by ==='rachel') {
									return (
										<div>
										<li>{item.item}</li>
										</div>
									)
								}}
							)}
						</div>
					</div>
				</div>
			</div> 
		)}
};

export default Pack;
