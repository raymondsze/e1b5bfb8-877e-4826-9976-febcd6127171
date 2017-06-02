import ApolloClient from 'apollo-client';

function createApolloClient(options) {
  return new ApolloClient({
    ...options,
    // to make apollo client immutableJs compatible
    reduxRootSelector: (state) => {
      return state.toJS();
    },
  });
}

export default createApolloClient;
