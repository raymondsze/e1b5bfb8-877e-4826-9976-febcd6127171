import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { createActions, handleActions } from 'redux-actions';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import createBrowserHistory from 'history/createBrowserHistory';
import { IntlProvider } from 'react-intl';
import { fromJS } from 'immutable';
import { ConnectedRouter, LOCATION_CHANGE, routerMiddleware } from 'react-router-redux';
import { withRouter } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function withReducers(asyncReducers) {
  return function (Component$$1) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
      inherits(WithReducers, _React$Component);

      function WithReducers(props, context) {
        classCallCheck(this, WithReducers);

        var _this = possibleConstructorReturn(this, (WithReducers.__proto__ || Object.getPrototypeOf(WithReducers)).call(this, props, context));

        context.store.injectAsyncReducers(asyncReducers);
        return _this;
      }

      createClass(WithReducers, [{
        key: 'render',
        value: function render() {
          return React.createElement(Component$$1, this.props);
        }
      }]);
      return WithReducers;
    }(React.Component), _class.contextTypes = {
      store: PropTypes.object.isRequired
    }, _temp;
  };
}

function withSagas(asyncSagas) {
  return function (Component$$1) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
      inherits(WithReducers, _React$Component);

      function WithReducers(props, context) {
        classCallCheck(this, WithReducers);

        var _this = possibleConstructorReturn(this, (WithReducers.__proto__ || Object.getPrototypeOf(WithReducers)).call(this, props, context));

        context.store.injectAsyncSagas(asyncSagas);
        return _this;
      }

      createClass(WithReducers, [{
        key: 'render',
        value: function render() {
          return React.createElement(Component$$1, this.props);
        }
      }]);
      return WithReducers;
    }(React.Component), _class.contextTypes = {
      store: PropTypes.object.isRequired
    }, _temp;
  };
}

var DEFAULT_LOCALE = 'en';

var LOCALE_CHANGE = 'LOCALE_CHANGE';

var _createActions = createActions(defineProperty({}, LOCALE_CHANGE, function (locale) {
  return {
    locale: locale
  };
}));
var localeChange = _createActions.localeChange;

var getLanguage = function getLanguage(state) {
  return state.get('language');
};

var getLocale = createSelector(getLanguage, function (languageState) {
  return languageState.get('locale');
});

var getLocaleMessages = createSelector(getLanguage, function (languageState) {
  return languageState.get('messages').toJS();
});

var mapStateToProps = createSelector(getLocale, getLocaleMessages, function (locale, messages) {
  return { locale: locale, messages: messages };
});

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: function changeLocale(locale) {
      return dispatch(localeChange(locale));
    }
  };
}

function withLocale(Component$$1) {
  return connect(mapStateToProps, mapDispatchToProps)(Component$$1);
}

var initialState = fromJS({
  locale: DEFAULT_LOCALE,
  // eslint-disable-next-line no-underscore-dangle
  messages: global.__messages__ || {}
});

var reducers = {
  language: handleActions(defineProperty({}, LOCALE_CHANGE, function (state, _ref) {
    var payload = _ref.payload;
    return state.set('locale', payload.locale);
  }), initialState)
};

var _class$1;
var _temp$1;

var mapStateToProps$1 = createSelector(getLocale, getLocaleMessages, function (locale, messages) {
  return { locale: locale, messages: messages };
});

var withReducers$1 = withReducers(reducers);
var withRedux = connect(mapStateToProps$1);

// eslint-disable-next-line react/prefer-stateless-function
var LanguageProvider = (_temp$1 = _class$1 = function (_Component) {
  inherits(LanguageProvider, _Component);

  function LanguageProvider() {
    classCallCheck(this, LanguageProvider);
    return possibleConstructorReturn(this, (LanguageProvider.__proto__ || Object.getPrototypeOf(LanguageProvider)).apply(this, arguments));
  }

  createClass(LanguageProvider, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          locale = _props.locale,
          messages = _props.messages,
          children = _props.children;

      return React.createElement(
        IntlProvider,
        {
          key: locale,
          locale: locale,
          messages: messages && messages[locale]
        },
        React.Children.only(children)
      );
    }
  }]);
  return LanguageProvider;
}(Component), _class$1.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired
}, _temp$1);


var LanguageProvider$1 = withReducers$1(withRedux(LanguageProvider));

var _class$3;
var _temp$3;

// Alternative solution of react-router-scroll for react-router v4
var ScrollTop = (_temp$3 = _class$3 = function (_React$Component) {
  inherits(ScrollTop, _React$Component);

  function ScrollTop() {
    classCallCheck(this, ScrollTop);
    return possibleConstructorReturn(this, (ScrollTop.__proto__ || Object.getPrototypeOf(ScrollTop)).apply(this, arguments));
  }

  createClass(ScrollTop, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        // scroll to top if location is different
        window.scrollTo(0, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return React.Children.only(children);
    }
  }]);
  return ScrollTop;
}(React.Component), _class$3.propTypes = {
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired
}, _temp$3);


var ScrollTop$1 = withRouter(ScrollTop);

var _class$2;
var _temp$2;

// eslint-disable-next-line react/prefer-stateless-function
var RouteProvider = (_temp$2 = _class$2 = function (_Component) {
  inherits(RouteProvider, _Component);

  function RouteProvider() {
    classCallCheck(this, RouteProvider);
    return possibleConstructorReturn(this, (RouteProvider.__proto__ || Object.getPrototypeOf(RouteProvider)).apply(this, arguments));
  }

  createClass(RouteProvider, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          history = _props.history,
          children = _props.children;

      return React.createElement(
        ConnectedRouter,
        { history: history },
        React.createElement(
          ScrollTop$1,
          null,
          React.Children.only(children)
        )
      );
    }
  }]);
  return RouteProvider;
}(Component), _class$2.propTypes = {
  history: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired
}, _temp$2);

// since react-router-redux reducer does not support immutable data structure
// we need to customize a new reducer for react-router

// initial state for react-router
var routeInitialState = fromJS({
  locationBeforeTransitions: null
});

// the routeReducer
// LOCATION_CHANGE is dispatched when history changed
function routeReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : routeInitialState;
  var action = arguments[1];

  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      return state;
  }
}

// create reducer
function createReducer(asyncReducers, apolloClient) {
  return combineReducers(_extends({
    route: routeReducer,
    apollo: apolloClient.reducer()
  }, asyncReducers));
}

var sagaMiddleware = createSagaMiddleware();

function configureStore(_ref) {
  var _ref$state = _ref.state,
      state = _ref$state === undefined ? {} : _ref$state,
      client = _ref.client,
      history = _ref.history,
      reducers = _ref.reducers,
      enhancers = _ref.enhancers;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  var middlewares = [sagaMiddleware, routerMiddleware(history), client.middleware()];

  var finalEnhancers = [applyMiddleware.apply(undefined, middlewares)].concat(toConsumableArray(enhancers));

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  var composeEnhancers =
  // if client side and not in production, enable the redux dev tool
  process.env.NODE_ENV !== 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  var store = createStore(createReducer(reducers, client), fromJS(state), composeEnhancers.apply(undefined, toConsumableArray(finalEnhancers)));

  // Extensions
  store.runSaga = sagaMiddleware.run;

  // Reducers repository
  store.asyncReducers = reducers;

  // Create injector functions
  store.injectAsyncReducers = function (asyncReducers) {
    store.asyncReducers = _extends({}, store.asyncReducers, asyncReducers);
    store.replaceReducer(createReducer(store.asyncReducers, client));
  };

  store.injectAsyncSagas = function (sagas) {
    sagas.map(store.runSaga);
  };

  return store;
}

var _class;
var _temp;

var history = createBrowserHistory();

var RSAProvider = (_temp = _class = function (_Component) {
  inherits(RSAProvider, _Component);

  function RSAProvider() {
    classCallCheck(this, RSAProvider);
    return possibleConstructorReturn(this, (RSAProvider.__proto__ || Object.getPrototypeOf(RSAProvider)).apply(this, arguments));
  }

  createClass(RSAProvider, [{
    key: 'render',
    value: function render() {
      var client = this.client;
      var store = this.store;
      var children = this.props.children;

      return React.createElement(
        ApolloProvider,
        { client: client, store: store },
        React.createElement(
          LanguageProvider$1,
          null,
          React.createElement(
            RouteProvider,
            { history: history },
            React.Children.only(children)
          )
        )
      );
    }
  }, {
    key: 'client',
    get: function get() {
      var client = this.props.client;

      return new ApolloClient(client);
    }
  }, {
    key: 'store',
    get: function get() {
      var client = this.client;
      var _props = this.props,
          state = _props.state,
          reducers = _props.reducers,
          enhancers = _props.enhancers;

      return configureStore({ state: state, history: history, client: client, reducers: reducers, enhancers: enhancers });
    }
  }]);
  return RSAProvider;
}(Component), _class.defaultProps = {
  state: {},
  client: {
    networkInterface: createNetworkInterface({
      uri: '/graphql',
      opts: {
        credentials: 'same-origin'
      }
    }),
    reduxRootSelector: function reduxRootSelector(state) {
      return state.toJS();
    }
  },
  reducers: {},
  enhancers: []
}, _class.propTypes = {
  state: PropTypes.shape({}).isRequired,
  client: PropTypes.shape({}).isRequired,
  reducers: PropTypes.objectOf(PropTypes.func.isRequired),
  enhancers: PropTypes.arrayOf(PropTypes.func.isRequired),
  children: PropTypes.element.isRequired
}, _temp);

export { withReducers as injectReducers, withSagas as injectSagas, withLocale, RSAProvider };
//# sourceMappingURL=index.es.js.map
