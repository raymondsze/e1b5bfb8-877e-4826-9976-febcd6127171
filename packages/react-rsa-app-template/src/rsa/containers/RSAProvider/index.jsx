import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { /* createBrowserHistory, */ createMemoryHistory } from 'history';

import LanguageProvider from '../LanguageProvider';
import RouteProvider from '../RouteProvider';

import configureStore from '../../configureStore';

const history = createMemoryHistory();

class RSAProvider extends Component {
  static defaultProps = {
    state: {},
    client: {
      networkInterface: createNetworkInterface({
        uri: '/graphql',
        opts: {
          credentials: 'same-origin',
        },
      }),
      reduxRootSelector: state => state.toJS(),
    },
    reducers: {},
    enhancers: [],
  };

  static propTypes = {
    state: PropTypes.shape({}).isRequired,
    client: PropTypes.shape({}).isRequired,
    reducers: PropTypes.objectOf(PropTypes.func.isRequired),
    enhancers: PropTypes.arrayOf(PropTypes.func.isRequired),
    children: PropTypes.element.isRequired,
  };

  get client() {
    const { client } = this.props;
    return new ApolloClient(client);
  }

  get store() {
    const client = this.client;
    const { state, reducers, enhancers } = this.props;
    return configureStore({ state, history, client, reducers, enhancers });
  }

  render() {
    const client = this.client;
    const store = this.store;
    const { children } = this.props;
    return (
      <ApolloProvider client={client} store={store}>
        <LanguageProvider>
          <RouteProvider history={history}>
            {React.Children.only(children)}
          </RouteProvider>
        </LanguageProvider>
      </ApolloProvider>
    );
  }
}

export default RSAProvider;
