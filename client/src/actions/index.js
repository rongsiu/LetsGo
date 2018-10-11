import axios from 'axios';

// export const addTrip = (id, trip, start_date, end_date) => {
// 	return (dispatch) => {
// 		return axios.post('/api/trips', {trip, start_date, end_date})
// 			.then(response => {
// 				dispatch(addTripSuccess(response.data))
// 			})
// 			.catch(error => {
// 				throw(error)
// 			})
// 	}
// }

// export const addTripSuccess = data => {
// 	return {
// 		type: 'ADD_TRIP',
// 		payload: {
// 			id: data.row.split(",")[0].substring(1),
// 			trip: data.trip, 
//       start_date: data.start_date,
//       end_date: data.end_date,
// 		}
// 	}
// }

// export const deleteTrip = trip_id => {
//   return (dispatch) => {
//     return axios.delete('/api/trips', data: {trip_id})
//       .then(response => {
//         dispatch(deleteTripSuccess(response.data))
//       })
//       .catch(error => {
//         throw(error);
//       });
//   };
// };


// export const deleteTripSuccess = id => {
//   return {
//     type: DELETE_POST,
//     payload: {
//       id
//     }
//   }
// }


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



