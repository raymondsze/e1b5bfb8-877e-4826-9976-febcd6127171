import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';

import ScrollTop from '../../components/ScrollTop';

class RouteProvider extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.element,
  };

  render() {
    const { history, children } = this.props;
    return (
      <ConnectedRouter history={history}>
        <ScrollTop>
          {React.Children.only(children)}
        </ScrollTop>
      </ConnectedRouter>
    )
  }
}

export default RouteProvider;
