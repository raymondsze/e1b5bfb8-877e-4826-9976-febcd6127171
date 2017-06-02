import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  DEFAULT_LOCALE,
  LOCALE_CHANGE_SUCCESS,
  LOCALE_CHANGE_FAILURE,
} from './constants';

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

export default {
  language: handleActions({
    [LOCALE_CHANGE_SUCCESS]: (state, { payload }) => {
      return state
        .delete('error')
        .set('locale', payload.locale)
        .set('messages', payload.messages);
    },
    [LOCALE_CHANGE_FAILURE]: (state, { payload }) => {
      return state
        .set('error', payload);
    }, 
  }, initialState),
};
