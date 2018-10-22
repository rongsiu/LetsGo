import React from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../actions';
import NewTrip from '../components/NewTrip.jsx';

const mapDispatchToProps = dispatch => {
  return {
    onAddTrip: trip => {
      dispatch(addTrip(trip));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewTrip);