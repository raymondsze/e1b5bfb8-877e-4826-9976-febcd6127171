import React, { PureComponent } from 'react';
import { withRouter } from 'react-router'

// Alternative solution of react-router-scroll for react-router v4
class ScrollTop extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // scroll to top if location is different
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollTop);
