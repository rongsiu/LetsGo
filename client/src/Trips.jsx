import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import $ from 'jquery';
import axios from 'axios';

class Trips extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trips: [],
    };
    this.deleteTrip = this.deleteTrip.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api/trips')
      .then(response => {
        this.setState({
          trips: response.data
        })
      })
      .catch(error => {
        console.log(error);
    });
  }

  deleteTrip(trip) {
    for(let i=0; i<this.state.trips.length; i++) {
      if(this.state.trips[i].location === trip) {
        this.setState({
          trips: response.data.splice(i, 1)
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <form className="form-group col-md-6 col-sm-12">
            <button>Find a Trip</button>
          </form>
          <form className="form group col-md-6 col-sm-12">
            <input type="text" placeholder="Location" />
            <input type="date" />
            <input type="date" />
            <input type="submit" value="Add" />
          </form>
        </div>
        {this.state.trips.map(trip => 
          <div className="row main_trip" key={trip.id}>
            <span className="col-md-4">{trip.location}</span>
            <span className="col-md-4">{`${trip.start_date}-${trip.end_date}`}</span>
            <button className="col-md-1">
              <Link to={{ pathname: `/pack/${trip.location}`, state: { dates: `${trip.start_date}-${trip.end_date}`} }}>Pack</Link>
            </button>
            <i className="col-md-1 fas fa-trash-alt"></i>
          </div>
        )}
      </div>
  )}
}

export default Trips;
