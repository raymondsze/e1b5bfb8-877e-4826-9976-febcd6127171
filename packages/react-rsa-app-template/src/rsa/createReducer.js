import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// since react-router-redux reducer does not support immutable data structure
// we need to customize a new reducer for react-router

// initial state for react-router
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

// the routeReducer
// LOCATION_CHANGE is dispatched when history changed
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

// create reducer
function createReducer(asyncReducers, apolloClient) {
  return combineReducers({
    route: routeReducer,
    apollo: apolloClient.reducer(),
    ...asyncReducers,
  });
}

export default createReducer;
