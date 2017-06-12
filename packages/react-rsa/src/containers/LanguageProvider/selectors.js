import { createSelector } from 'reselect';

const getLanguage = state => state.get('language');

const getLocale = createSelector(
  getLanguage,
  languageState => languageState.get('locale'),
);

const getLocaleMessages = createSelector(
  getLanguage,
  languageState => languageState.get('messages').toJS(),
);

export {
  getLanguage,
  getLocale,
  getLocaleMessages,
};
