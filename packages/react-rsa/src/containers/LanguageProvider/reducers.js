import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  DEFAULT_LOCALE,
  LOCALE_CHANGE,
} from './constants';

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
   // eslint-disable-next-line no-underscore-dangle
  messages: global.__messages__ || {},
});

export default {
  language: handleActions({
    [LOCALE_CHANGE]: (state, { payload }) =>
      state.set('locale', payload.locale),
  }, initialState),
};
