import axios from 'axios';

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
		type: 'ADD_TRIP',
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
  return (dispatch) => {
    return axios.delete('/api/trips')
      .then(response => {
        dispatch(deleteTripSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const deleteTripSuccess = id => {
  return {
    type: 'DELETE_POST',
    payload: {
      id
    }
  }
}


export const getTrip = (trips) => {
  return {
    type: 'GET_TRIP',
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



