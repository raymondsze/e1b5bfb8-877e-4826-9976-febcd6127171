import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import Div from './styles';
import messages from './messages';

class App extends PureComponent {
  static propTypes = {
    intl: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { intl, children } = this.props;
    /* eslint-disable react/no-danger, react/no-danger-with-children*/
    return (
      <Div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            <FormattedMessage {...messages.welcome} />
          </h2>
        </div>
        <p
          className="App-intro"
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(messages.instruction, {
              code: '<code>src/containers/App.js</code>',
            }),
          }}
        />
        <div>
          <Link className="App-route" to="/">Home</Link>
          <Link className="App-route" to="/i18n">I18n</Link>
        </div>
        {React.Children.only(children)}
      </Div>
    );
    /* eslint-enable react/no-danger, react/no-danger-with-children*/
  }
}

export default withRouter(injectIntl(App));
