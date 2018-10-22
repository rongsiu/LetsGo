import axios from 'axios';
import * as types from '../constants/ActionTypes'

export const addTrip = ( {location, start, end} ) => {
	return (dispatch) => {
		return axios.post('/api/trips', { location, start, end})
			.then(response => {
				dispatch(addTripSuccess(response.data))
			})
			.catch(error => {
				throw(error)
			})
	}
}

export const addTripSuccess = data => {
	return {
		type: types.ADD_TRIP,
		payload: {
			// id: data.row.split(",")[0].substring(1),
      id: data._id,
			location: data.location, 
      start: data.start,
      end: data.end
		}
	}
}

export const deleteTrip = id => {
  console.log('faerfe')
  return (dispatch) => {
    return axios.delete('/api/trips', {
      data: {trip_id: id}
    })
      .then(response => {
        console.log('hhhh', response.data)
        dispatch(deleteTripSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const deleteTripSuccess = data => {
  console.log(data)
  return {
    type: types.DELETE_TRIP,
    payload: {
      id: data.id
    }
  }
}


export const getTrip = (trips) => {
  return {
    type: types.GET_TRIP,
    trips
  }
};


export const getAllTrips = () => {
  return (dispatch) => {
    return axios.get('/api/trips')
      .then(response => {
        dispatch(getTrip(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};



