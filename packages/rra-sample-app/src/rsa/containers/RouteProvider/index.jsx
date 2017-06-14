import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';

import ScrollTop from '../../components/ScrollTop';

// eslint-disable-next-line react/prefer-stateless-function
class RouteProvider extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { history, children } = this.props;
    return (
      <ConnectedRouter history={history}>
        <ScrollTop>
          {React.Children.only(children)}
        </ScrollTop>
      </ConnectedRouter>
    );
  }
}

export default RouteProvider;
