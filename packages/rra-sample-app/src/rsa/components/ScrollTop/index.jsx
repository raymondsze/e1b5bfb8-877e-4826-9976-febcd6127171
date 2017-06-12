import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

// Alternative solution of react-router-scroll for react-router v4
class ScrollTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // scroll to top if location is different
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children, location } = this.props;
    return React.Children.only(children);
  }
}

export default withRouter(ScrollTop);
