import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import { $history } from "nurse-o-core";
import { LoginPage } from './Pages/LoginPage';
import { SelectPatient } from './Pages/SelectPatientPage';
import {Database} from './Services/Database';
import firebaseConfig from "./firebaseConfig.json";
import DashboardPage from './Pages/DashboardPage';
export default class App extends React.Component {


  
  constructor(props: any) {
    super(props);
    Database.initialize(firebaseConfig);
  }

  render() {
    return (
      <Router history={$history.value}>
        <Switch>
          <Route exact path="/"><LoginPage /></Route>
          <Route exact path="/selectPatient"><SelectPatient /></Route>
          <Route exact path="/dashboard"><DashboardPage /></Route>
        </Switch>
      </Router>
    );
  }
}