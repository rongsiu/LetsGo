import React from 'react';
import { connect } from 'react-redux';
import Trip from '../components/Trip.jsx';
// import NewTrip from '../components/NewTrip.jsx';
import NewTrip from '../containers/NewTrip-container.js'
import { deleteTrip } from '../actions';

function Trips({ trips, onDelete }) {

	    return (
      <div className="container">
      <NewTrip />
        {trips.map(trip => {
          return (
            <Trip trip = { trip } key = { trip.id } onDelete={ onDelete }/>
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

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(deleteTrip(id));
    },

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trips);
