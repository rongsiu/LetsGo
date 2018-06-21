import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

class Trips extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      trips: [],
    };
  }

  componentDidMount() {
    axios.get('/api/trips')
      .then(response => {
        console.log(response.data)
        this.setState({
          trips: response.data
        })
      })
      .catch(error => {
        console.log(error);
    });
  }

  addTrip(trip, start, end, e) {
    e.preventDefault();
    axios.post('/api/trips/add', {trip, start, end})
      .then(response => {
        let newPost = 
          {
          id: response.data.row.split(",")[0].substring(1),
          trip: response.data.row.split(",")[1],
          start_date: response.data.row.split(",")[2],
          end_date: response.data.row.split(",")[3].substring(0,response.data.row.split(",")[2].length-1),
          };
        this.setState(prevState => ({
          trips: [newPost, ...prevState.trips]
        }))
        $("#newTrip").val("")
      })
      .catch(error => {
        console.log(error)
      })

  }

  deleteTrip(trip_id) {
    axios.delete('/api/trips/delete', {
      data: {trip_id}
    })
    .then(response => {
      this.setState(prevState => {
        let newState = [...prevState.trips];
        for(let i = 0; i < newState.length; i++) {
          if(newState[i].id.toString() === trip_id) {
            newState.splice(i, 1)
          }
        }
        return {
          trips: newState
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add_trip">
          <input className="start_form" type="text" placeholder="   Location" id="newTrip"/>
          <input type="date" id="start"/>
          <input type="date" id="end"/>
          <input className="end_form" type="submit" value="Add" onClick={(e) => this.addTrip($('#newTrip').val(), $('#start').val(), $('#end').val(), e)}/>
        </form>
        {this.state.trips.map(trip => 
          <div className="row trips">
            <span className="col-md-5">{trip.trip}</span>
            <span className="col-md-5">{`${moment(trip.start_date).format('DD MMM')} - ${moment(trip.end_date).format('DD MMM')}`}</span>
            <Link className="col-md-1" to={{ pathname: `/pack/${trip.trip}/${trip.id}`, state: { dates: `${trip.start_date}-${trip.end_date}`} }}>
              <i className="icon fas fa-suitcase fa-lg"></i>
            </Link>
            <div className="col-md-1">
              <i className="icon fas fa-minus-circle fa-lg" id={trip.id} onClick={(e) => this.deleteTrip(e.target.id)}></i>
            </div>
          </div>
        )}
      </div>
  )}
}

export default Trips;
