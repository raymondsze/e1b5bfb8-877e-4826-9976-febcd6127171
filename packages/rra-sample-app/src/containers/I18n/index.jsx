import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';

import { withLocale } from 'react-rsa';
import Div from './styles';
import messages from './messages';

@injectIntl
@withLocale
class I18n extends PureComponent {
  static propTypes = {
    intl: PropTypes.shape({}).isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  handleLangButtonClick = (event) => {
    const { changeLocale } = this.props;
    changeLocale(event.target.getAttribute('data-value'));
  };

  renderLangButton(locale) {
    const { intl } = this.props;
    return (
      <button className="App-lang-btn" onClick={this.handleLangButtonClick} data-value={locale}>
        {intl.formatMessage(messages[`languages-${locale}`])}
      </button>
    );
  }

  render() {
    return (
      <Div className="I18n">
        {this.renderLangButton('en')}
        {this.renderLangButton('zh-Hans')}
        {this.renderLangButton('zh-Hant')}
      </Div>
    );
  }
}

export default I18n;
