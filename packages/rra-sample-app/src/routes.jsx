import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './containers/Home';
import I18n from './containers/I18n';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/i18n" component={I18n} />
  </Switch>
);
