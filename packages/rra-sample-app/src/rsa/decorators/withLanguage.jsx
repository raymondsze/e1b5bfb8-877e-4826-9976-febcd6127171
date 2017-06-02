import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { localeChangeRequest } from '../containers/LanguageProvider/actions';
import { getLanguage } from '../containers/LanguageProvider/selectors';

const mapStateToProps = createSelector(
  getLanguage,
  ({ locale, messages }) => ({ locale, messages })
);

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(localeChangeRequest(locale)),
  };
}

function withLanguage(Component) {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
}

export default withLanguage;
