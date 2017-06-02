import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOCALE_CHANGE_REQUEST,
} from './constants';
import {
  localeChangeSuccess,
  localeChangeFailure,
} from './actions';

export async function loadMessages(locale) {
  return Promise.resolve({});
}

export function* fetchLocaleMessages({
  payload: { locale },
}) {
  try {
    const messages = yield call(loadMessages, locale);
    yield put(localeChangeSuccess(locale, messages));
  } catch (error) {
    yield put(localeChangeFailure(error));
  }
}

export function* changeLocaleSaga() {
  yield takeEvery(LOCALE_CHANGE_REQUEST, fetchLocaleMessages);
}

export default [
  changeLocaleSaga,
];
