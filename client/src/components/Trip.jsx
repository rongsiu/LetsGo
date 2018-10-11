import React from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

const Trip = ({ trip: { trip, start_date, id, end_date }}) => {
  return (

      <div className="container">
          {console.log('aaaa', trip)}
          <div className="row trips">
            <div className="col-xs-4">{ trip }</div>
            <div className="col-xs-5">{`${moment( start_date ).format('DD MMM')} - ${moment( end_date ).format('DD MMM')}`}</div>
            <div className="icons col-xs-3">
              <Link to={{ pathname: `/pack/${ trip }/${ id }`, state: { dates: `${ start_date }-${ end_date }`} }}>
                <div><i className="icon fas fa-suitcase fa-lg"></i></div>
              </Link>
              <Link to={{ pathname: `/enjoy/${ trip }/${ id }`, state: { dates: `${ start_date }-${ end_date }`} }}>
                <div><i className="icon fas fa-info-circle fa-lg"></i></div>
              </Link>    
              <Link to={{ pathname: `/savor/${ trip }/${ id }`, state: { dates: `${ start_date }-${ end_date }`} }}>
                <div><i className="icon fas fa-images fa-lg"></i></div>
              </Link>
             
            </div>
          </div>
      </div>
)}

export default Trip;

 // <div ><i className="fas fa-minus-circle fa-lg" id={ id } onClick={(e) => deleteTrip(e.target.id)}></i></div>