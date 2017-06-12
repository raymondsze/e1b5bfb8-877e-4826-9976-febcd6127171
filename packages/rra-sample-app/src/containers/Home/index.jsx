import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Div from './styles';
import messages from './messages';

class Home extends PureComponent {
  render() {
    const { changeLocale, intl } = this.props;
    return (
      <Div className="Home">
        This is the homepage.
      </Div>
    )
  }
}

export default Home;
