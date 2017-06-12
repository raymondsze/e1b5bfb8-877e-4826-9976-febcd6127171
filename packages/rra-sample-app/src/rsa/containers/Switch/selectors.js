import { createSelector } from 'reselect';

const getRoute = (state) => state.get('route');

const getLocation = createSelector(
  getRoute,
  route => route.get('locationBeforeTransitions')
);

export {
  getRoute,
  getLocation,
};
