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
		this.strikeThrough = this.strikeThrough.bind(this)
	}

	componentWillMount() {
		this.trip = this.props.location.pathname.split('/')[2];
		this.trip_id = this.props.location.pathname.split('/')[3];
	}

	componentDidMount() {

		axios.get(`http://localhost:3005/api/pack/shared/${this.trip_id}`)
			.then(response => {
				this.setState({
					shared_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/pack/favor/${this.trip_id}`)
			.then(response => {
				this.setState({
					favor_items: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})

		axios.get(`http://localhost:3005/api/pack/personal/${this.trip_id}`)
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
		axios.post(`/api/pack/add/${type}`, {
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

	deleteItems(type, trip_id, item_id) {
    axios.delete(`/api/pack/delete/${type}`, {
      data: {trip_id, item_id}
    })
    .then(response => {
			this.setState(prevState => {
        let newState = [...prevState[type]];
        for(let i = 0; i < newState.length; i++) {
          if(newState[i].id.toString() === item_id) {
            newState.splice(i, 1)
          }
        }
        return {
          [type]: newState
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }


	claimItems(e, type, trip_id, id, claimed_by) {
		e.preventDefault();
		axios.patch(`/api/pack/claim/${type}`, {
			trip_id,
			id,
			claimed_by
		})
		.then(response => {
			this.setState(prevState => {
				let newState = [...prevState[type]];
				for(let i = 0; i < newState.length; i++) {
					if(newState[i].id.toString() === id) {
						newState[i].claimed_by = claimed_by
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

	unclaimItems(e, type, trip_id, id) {
		e.preventDefault();
		axios.patch(`/api/pack/unclaim/${type}`, {
			trip_id,
			id,
		})
		.then(response => {
			console.log(response)
			this.setState(prevState => {
				let newState = [...prevState[type]];
				for(let i = 0; i < newState.length; i++) {
					if(newState[i].id.toString() === id) {
						newState[i].claimed_by = null
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

//strikethrough not working
	strikeThrough() {
		console.log('fwefwe')
		$(".myItems").not(this).removeClass("strike_through");    
  	$(this).toggleClass("strike_through");
	}

//UPDATED ADDED BY onClick- HARDCODED NOW CLAIMED BY hardcoded
  render() {
		return (
			<div className="container">
				<h2>{this.trip}</h2>
				
				<div className="pack_category">
					<div className="pack_head">
						<h3>Shared</h3>
						<form className="add_item">
							<input className="start_form" type="text" id="shared"/>
							<input className="end_form" type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'shared_items', this.trip_id, $('#shared').val(), 'rachel')}/>
						</form>
					</div>

					<div>
						{this.state.shared_items.map(item =>
							<div className="pack_item">
								{item.claimed_by ? 
									<div style={{width: "18px"}}></div> :
									<i className="fas fa-check-circle" id={item.id} onClick={(e)=> this.claimItems(e, 'shared_items', this.trip_id, e.target.id,'rachel')}></i>	
								}
								<div>{item.item}</div>
								<div className="claimed_by">{item.claimed_by ? item.claimed_by : ''}</div>
							</div>
						)}
					</div>
				</div>
			
				<div className="pack_category">
					<div className="pack_head">
						<h3>Favors</h3>
						<form className="add_item">
							<input className="start_form" type="text" id="favor"/>
							<input className="end_form"type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'favor_items', this.trip_id, $('#favor').val(), 'rachel')}/>
						</form>
					</div>
					<div>
						{this.state.favor_items.map(item => 
							<div className="pack_item">
								{item.claimed_by ? 
									<div style={{width: "18px"}}></div> :
									<i className="fas fa-check-circle" id={item.id} onClick={(e)=> this.claimItems(e, 'favor_items', this.trip_id, e.target.id,'rachel')}></i>
								}
								<div>{item.item}</div>
								<div className="claimed_by">{item.claimed_by ? item.claimed_by : ''}</div>
							</div>
						)}
					</div>
				</div>

				<div className="pack_category">
					<div className="pack_head">
						<h3>Personal</h3>
						<form className="add_item">
							<input className="start_form" type="text" id="personal"/>
							<input className="end_form"type="submit" value="Add Items" onClick={(e)=> this.addItems(e, 'personal_items', this.trip_id, $('#personal').val(), 'rachel')}/>
						</form>
					</div>
					<div className="row">
						<div className="col-md-3">
						<div>Self</div>
							{this.state.personal_items.map(item => 
								<div className="pack_item">
								<i className="fas fa-minus-circle" id={item.id} onClick={(e)=> this.deleteItems('personal_items', this.trip_id, e.target.id)}></i>
								<div>{item.item}</div>
								</div>
							)}
						</div>
						<div className="col-md-3">
						<div>Claimed Group</div>
							{this.state.shared_items.map(item => {
								if(item.claimed_by ==='rachel') {
									return (
									<div className="pack_item">
									<i className="fas fa-minus-circle" id={item.id} onClick={(e)=> this.unclaimItems(e, 'shared_items', this.trip_id, e.target.id)}></i>
									<div>{item.item}</div>
									</div>)
								}}
							)}
						</div>
						<div className="col-md-3">
						<div>Claimed Favor</div>
							{this.state.favor_items.map(item => {
								if(item.claimed_by ==='rachel') {
									return (
									<div className="pack_item">
									<i className="fas fa-minus-circle" id={item.id} onClick={(e)=> this.unclaimItems(e, 'favor_items', this.trip_id, e.target.id)}></i>
									<div>{item.item}</div>
									</div>)
								}}
							)}						
						</div>
						<div className="col-md-3">
						<div>Your Requests</div>
							{this.state.favor_items.map(item => {
								if(item.added_by ==='rachel') {
									return (
										<div className="pack_item">
											<i className="fas fa-minus-circle" id={item.id} onClick={(e)=> this.deleteItems('favor_items', this.trip_id, e.target.id)}></i>
											<div className="myItems strike_through" onClick={this.strikeThrough}>{item.item}</div>
											<div className="claimed_by">{item.claimed_by ? item.claimed_by : 'unclaimed!!'}</div>
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
