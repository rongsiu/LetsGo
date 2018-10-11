import React from 'react';
import { connect } from 'react-redux';
import Trip from '../components/Trip.jsx';

function Trips({ trips }) {

  // trips = [{trip:'waaaa', id:1},{trip:'waa', id:2}]
	    return (
      <div className="container">
      {console.log('sfewf', trips)}
      {console.log('bbb', <Trip />)}
        {trips.map(trip => {
          return (
            <Trip trip = { trip } key = { trip.id } />
          )
        })}
      </div>
  )
}

const mapStateToProps = state => {
  return {
    trips: state.trips
  };
};

export default connect(
  mapStateToProps
)(Trips);