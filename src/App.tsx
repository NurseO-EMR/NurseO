import React from 'react';
import './lib/react-pure-modal.min.css';
import {Route, Router, Switch} from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import DashboardPage from './Pages/StudentView/Dashboard/DashboardPage';
import {$error, $history, $patient} from "./Services/State";
import Login from './Pages/Login';
import MARPage from "./Pages/StudentView/Mar/MARPage"
import MedicationsPage from './Pages/StudentView/Dashboard/MedicationsPage';
import AllergiesPage from './Pages/StudentView/Dashboard/AllergiesPage';
import FlagsPage from './Pages/StudentView/Dashboard/FlagsPage';
import VitalsPage from './Pages/StudentView/Vitals/VitalsPage';
import VitalsViewPage from './Pages/StudentView/Vitals/VitalsViewPage';
import Database from './Services/Database';
import { PatientNotFoundError,PatientChart } from 'nurse-o-core';
import SelectPatient from './Pages/StudentView/SelectPatient';
import AdministerMedsPage from './Pages/StudentView/Mar/AdministerMedsPage';
import AdmissionOrdersPage from './Pages/StudentView/Orders/AdmissionOrders';
import StandingOrdersPage from './Pages/StudentView/Orders/StandingOrders';
import AllOrders from './Pages/StudentView/Orders/AllOrders';
import AssessmentSubmitPage from './Pages/StudentView/Assessments/AssessmentsSubmitPage';
import AssessmentViewPage from './Pages/StudentView/Assessments/AssessmentsViewPage';
import LabsViewerPage from './Pages/StudentView/Labs/LabsViewerPage';
import IORecordSubmitPage from './Pages/StudentView/IORecord/IORecordSubmitPage';
import IORecordViewPage from './Pages/StudentView/IORecord/IORecordViewPage';


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
        patient: new PatientChart()
    }
    Database.initialize();
    getAnalytics();
    $error.subscribe(error=>{
      if(error instanceof PatientNotFoundError) this.history.replace("/");
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
          <Route exact path="/studentView/mar/administer"><AdministerMedsPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/vitals"><VitalsViewPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/vitals/view"><VitalsViewPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/vitals/submit"><VitalsPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/labs"><LabsViewerPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/labs/view"><LabsViewerPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/orders/all"><AllOrders patient={this.state.patient} /></Route>
          <Route exact path="/studentView/orders/admission"><AdmissionOrdersPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/orders/standing"><StandingOrdersPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/assessment/view"><AssessmentViewPage patient={this.state.patient} /></Route>    
          <Route exact path="/studentView/assessment/submit"><AssessmentSubmitPage patient={this.state.patient} /></Route>          

          <Route exact path="/studentView/io/view"><IORecordViewPage patient={this.state.patient} /></Route>         
          <Route exact path="/studentView/io/submit"><IORecordSubmitPage patient={this.state.patient} /></Route>         

        </Switch>
      </Router>
    )
  }
}
