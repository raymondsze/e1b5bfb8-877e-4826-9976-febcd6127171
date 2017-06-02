import { createActions } from 'redux-actions';
import {
  LOCALE_CHANGE_REQUEST,
  LOCALE_CHANGE_SUCCESS,
  LOCALE_CHANGE_FAILURE,
} from './constants';

const {
  localeChangeRequest,
  localeChangeSuccess,
  localeChangeFailure,
} = createActions({
  [LOCALE_CHANGE_REQUEST]: (locale) => ({
    locale,
  }),
  [LOCALE_CHANGE_SUCCESS]: (locale, messages) => ({
    locale,
    messages,
  }),
  [LOCALE_CHANGE_FAILURE]: error => error,
});

export {
  localeChangeRequest,
  localeChangeSuccess,
  localeChangeFailure,
};
