import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { locale } from '../../rsa';
import Routing from '../Routing';

import logo from './logo.svg';
import Div from './styles';
import messages from './messages';

@injectIntl
@locale
class App extends PureComponent {
  handleLangButtonClick = event => {
    const { changeLocale } = this.props;
    changeLocale(event.target.getAttribute('data-value'));
  }
  renderLangButton(locale) {
    const { intl } = this.props;
    return (
      <button
        className="App-lang-btn"
        onClick={this.handleLangButtonClick}
        data-value={locale}
      >
        {intl.formatMessage(messages[`languages-${locale}`])}
      </button>
    );
  }
  render() {
    const { changeLocale, intl } = this.props;
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
            __html: intl.formatMessage(messages.instruction, { code: '<code>src/containers/App.js</code>'})
          }}
        >
        </p>
        <div>
          <Link className="App-route" to="/">Home</Link>
          <Link className="App-route" to="/i18n">I18n</Link>
        </div>
        <Routing />
      </Div>
    )
  }
}

export default App;
