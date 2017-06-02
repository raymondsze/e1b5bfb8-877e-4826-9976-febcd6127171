import PropTypes from 'prop-types';
import React from 'react';

function withReducers(asyncReducers) {
  return (Component) => (
    class WithReducers extends React.Component {
      static contextTypes = {
        store: PropTypes.object.isRequired,
      };
      constructor(props, context) {
        super(props, context);
        context.store.injectAsyncReducers(asyncReducers);
      }
      render() {
        return <Component {...this.props} />;
      }
    }
  );
}

export default withReducers;
