const tripsReducer = (state =[], action) => {
	switch (action.type) {
    case 'ADD_TRIP':
      return [...state, action.payload];
    case 'DELETE_TRIP':
      return state.filter(trip => trip.id !== action.payload.id);
    case 'GET_TRIP':
      return action.trips;
    default:
      return state;
	}
}

export default tripsReducer