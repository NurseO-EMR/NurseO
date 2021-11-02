import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import DashboardPage from './Pages/StudentView/Dashboard/DashboardPage';
import { PatientChart } from './Types/PatientProfile';
import {$error, $history, $patient} from "./Services/State";
import Login from './Pages/Login';
import MARPage from "./Pages/StudentView/Mar/MARPage"
import MedicationsPage from './Pages/StudentView/Dashboard/MedicationsPage';
import AllergiesPage from './Pages/StudentView/Dashboard/AllergiesPage';
import FlagsPage from './Pages/StudentView/Dashboard/FlagsPage';
import VitalsPage from './Pages/StudentView/Vitals/VitalsPage';
import VitalsViewPage from './Pages/StudentView/Vitals/VitalsViewPage';
import Database from './Services/Database';
import LabsViewer from './Pages/StudentView/Labs/LabsViewer';
import { PatientNotFoundError } from './Types/ErrorCodes';
import SelectPatient from './Pages/SelectPatient';

type Props = {}
type State = {
    patient: PatientChart,
}
export default class App extends React.Component<Props, State> {

  private history;

  
  constructor(props: Props) {
    super(props)
    this.history = $history.value
    this.state = {
        patient: null
    }
    Database.initialize();
    $error.subscribe(error=>{
      if(error instanceof PatientNotFoundError) this.history.replace("/studentView/Dashboard");
    });
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

          <Route exact path="/studentView/selectPatient"><SelectPatient/></Route>

          <Route exact path="/studentView/dashboard"><DashboardPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/dashboard/medications"><MedicationsPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/dashboard/allergies"><AllergiesPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/dashboard/flags"><FlagsPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/mar"><MARPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/vitals"><VitalsViewPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/vitals/view"><VitalsViewPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/vitals/submit"><VitalsPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/labs"><LabsViewer patient={this.state.patient} /></Route>
          <Route exact path="/studentView/labs/view"><LabsViewer patient={this.state.patient} /></Route>
        </Switch>
      </Router>
    )
  }
}
