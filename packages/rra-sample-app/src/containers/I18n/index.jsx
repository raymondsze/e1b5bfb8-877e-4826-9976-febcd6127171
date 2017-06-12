import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';

import { locale } from '../../rsa';
import Div from './styles';
import messages from './messages';

@injectIntl
@locale
class I18n extends PureComponent {
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
      <Div className="I18n">
        {this.renderLangButton('en')}
        {this.renderLangButton('zh-Hans')}
        {this.renderLangButton('zh-Hant')}
      </Div>
    )
  }
}

export default I18n;
