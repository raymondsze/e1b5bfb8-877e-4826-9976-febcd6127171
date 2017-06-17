import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

// Alternative solution of react-router-scroll for react-router v4
class ScrollTop extends React.Component {
  static propTypes = {
    location: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // scroll to top if location is different
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export default withRouter(ScrollTop);
