import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import reducers from './reducers';
import sagas from './sagas';
import { getLocale, getLocaleMessages } from './selectors';
import { withReducers, withSagas } from '../../decorators';

const mapStateToProps = createSelector(
  getLocale,
  getLocaleMessages,
  ({ locale, messages }) => ({ locale, messages })
);

@withReducers(reducers)
@withSagas(sagas)
@connect(mapStateToProps)
class LanguageProvider extends PureComponent {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
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

export default LanguageProvider;
