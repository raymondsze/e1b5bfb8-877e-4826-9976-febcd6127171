import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { createSelector } from 'reselect';
import { getLocation } from './selectors';

// Wrokaround solution to obtain the location from redux store
// Component cannot be updated due to context update instead of props update
// This is known issue in react-router v4
// TODO: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
const mapStateToProps = createSelector(
  getLocation,
  location => ({ location: location.toJS() }),
);

export default connect(mapStateToProps)(Switch);
