import PropTypes from 'prop-types';
import React from 'react';

function withSagas(asyncSagas) {
  return Component => (
    class WithReducers extends React.Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
      };
      constructor(props, context) {
        super(props, context);
        context.store.injectAsyncSagas(asyncSagas);
      }
      render() {
        return <Component {...this.props} />;
      }
    }
  );
}

export default withSagas;
