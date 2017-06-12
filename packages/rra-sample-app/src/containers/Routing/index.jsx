import React, { Component } from 'react';
import { Switch, Route } from '../../rsa';
import Home from '../Home';
import I18n from '../I18n';

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/i18n" component={I18n} />
      </Switch>
    );
  }
}

export default Routing;
