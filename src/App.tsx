import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import { $history, Login } from "nurse-o-core";

export default class App extends React.Component {

  private history = $history.value

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route exact path="/">
          <div><Login></Login></div>
          </Route>
        </Switch>
      </Router>
    );
  }
}