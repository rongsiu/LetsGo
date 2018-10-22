import reducer from '../../client/src/reducers/tripsReducer';
import * as types from '../../client/src/constants/ActionTypes';

describe('trips reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })
})