import { createActions } from 'redux-actions';
import {
  LOCALE_CHANGE,
} from './constants';

const {
  localeChange,
} = createActions({
  [LOCALE_CHANGE]: locale => ({
    locale,
  }),
});

export {
  localeChange,
};
