import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './createReducer';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore({
  state = {},
  client,
  history,
  reducers,
  enhancers,
}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    client.middleware(),
  ];

  const finalEnhancers = [
    applyMiddleware(...middlewares),
    ...enhancers,
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    // if client side and not in production, enable the redux dev tool
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(reducers, client),
    fromJS(state),
    composeEnhancers(...finalEnhancers)
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;

  // Reducers repository
  store.asyncReducers = reducers;

  // Create injector functions
  store.injectAsyncReducers = (asyncReducers) => {
    store.asyncReducers = {
      ...store.asyncReducers,
      ...asyncReducers,
    };
    store.replaceReducer(createReducer(store.asyncReducers, client));
  };

  store.injectAsyncSagas = (sagas) => {
    sagas.map(store.runSaga);
  };

  return store;
}