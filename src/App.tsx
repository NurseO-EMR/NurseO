import { $history } from 'nurse-o-core';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import CreateLocationPage from './Pages/Meds/CreateLocationPage';
import EditLocationsPage from './Pages/Meds/EditLocationsPage';

export default class App extends React.Component {

  private history = $history.value

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route exact path="/"><DashboardPage /></Route>
          <Route exact path="/medications/locations/edit"><EditLocationsPage /></Route>
          <Route exact path="/medications/locations/create"><CreateLocationPage /></Route>
        </Switch>
      </Router>
    );
  }
}