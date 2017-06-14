import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
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
class Router extends PureComponent {
  static contextTypes = {
    router: PropTypes.object
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    console.log('getContext!!');
    console.log(this.context.router);
    return {
      router: {
        ...this.context.router,
        route: {
          ...this.context.router.route,
          location: this.props.location,
        },
      },
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export default connect(mapStateToProps)(Router);
