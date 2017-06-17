import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { localeChange } from '../containers/LanguageProvider/actions';
import { getLocale, getLocaleMessages } from '../containers/LanguageProvider/selectors';

const mapStateToProps = createSelector(
  getLocale,
  getLocaleMessages,
  (locale, messages) => ({ locale, messages }),
);

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(localeChange(locale)),
  };
}

function withLocale(Component) {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
}

export default withLocale;
