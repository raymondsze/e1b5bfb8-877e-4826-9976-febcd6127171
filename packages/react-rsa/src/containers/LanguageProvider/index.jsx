import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import reducers from './reducers';
import { getLocale, getLocaleMessages } from './selectors';
import { injectReducers } from '../../decorators';

const mapStateToProps = createSelector(
  getLocale,
  getLocaleMessages,
  (locale, messages) => ({ locale, messages }),
);

const withReducers = injectReducers(reducers);
const withRedux = connect(mapStateToProps);

// eslint-disable-next-line react/prefer-stateless-function
class LanguageProvider extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.shape({}).isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages && messages[locale]}
      >
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

export default withReducers(withRedux(LanguageProvider));
