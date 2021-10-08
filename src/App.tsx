import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import DashboardPage from './Pages/StudentView/DashboardPage';
import { PatientChart } from './Types/PatientProfile';
import {$patient} from "./Services/State";
import Login from './Pages/Login';
import MARPage from "./Pages/StudentView/MARPage"

type Props = {}
type State = {
    patient: PatientChart,
}
export default class App extends React.Component<Props, State> {

  private history;

  
  constructor(props: Props) {
    super(props)
    this.history = createBrowserHistory();
    this.state = {
        patient: null
    }
  }

  componentDidMount() {
      $patient.subscribe((val) => {
          this.setState({
              patient: val
          });
      }
      );
  }

  render() {
    return (
      <Router history={this.history}>
        <Switch>
          <Route exact path="/"><Login/></Route>
          <Route exact path="/studentView/dashboard"><DashboardPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/mar"><MARPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/vitals"><DashboardPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/labs"><DashboardPage patient={this.state.patient} /></Route>
        </Switch>
      </Router>
    )
  }
}
