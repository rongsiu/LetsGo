import React from 'react';
import ReactDOM from 'react-dom';

const Trips = (props) => {
  return (
    <div>
      <div className="row main_trip">
        <span className="col-md-4">Canada</span>
        <span className="col-md-4">June 1 - June 2</span>
        <button className="col-md-1">Pack</button>
        <button className="col-md-1">Enjoy</button>
        <button className="col-md-1">Savor</button>
        <i className="col-md-1 fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default Trips;
