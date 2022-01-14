import React from 'react';
import './lib/react-pure-modal.min.css';
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
import SelectPatient from './Pages/StudentView/SelectPatient';
import AdministerMedsPage from './Pages/StudentView/Mar/AdministerMedsPage';
import AdmissionOrdersPage from './Pages/StudentView/Orders/AdmissionOrders';
import ProviderOrdersPage from './Pages/StudentView/Orders/ProviderOrders';
import StandingOrdersPage from './Pages/StudentView/Orders/StandingOrders';
import AllOrders from './Pages/StudentView/Orders/AllOrders';
import AdminDashboard from './Pages/admin/AdminDashboard';
import EditAssessmentPage from './Pages/admin/EditsAssessment/EditAssessmentPage';
import AssessmentSubmitPage from './Pages/StudentView/Assessments/AssessmentsSubmitPage';
import CreatePatientPage from './Pages/admin/CreatePatient/CreatePatientPage';
import AssessmentViewPage from './Pages/StudentView/Assessments/AssessmentsViewPage';
import ViewPatientsPage from './Pages/admin/ViewPatients/ViewPatientsPage';
import EditVitalsPage from './Pages/admin/EditVitals/EditVitalsPage';
import EditMedicationsPage from './Pages/admin/EditMedications/EditMedicationsPage';

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

          <Route exact path="/studentView/labs"><LabsViewer patient={this.state.patient} /></Route>
          <Route exact path="/studentView/labs/view"><LabsViewer patient={this.state.patient} /></Route>

          <Route exact path="/studentView/orders/all"><AllOrders patient={this.state.patient} /></Route>
          <Route exact path="/studentView/orders/admission"><AdmissionOrdersPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/orders/provider"><ProviderOrdersPage patient={this.state.patient} /></Route>
          <Route exact path="/studentView/orders/standing"><StandingOrdersPage patient={this.state.patient} /></Route>

          <Route exact path="/studentView/assessment/view"><AssessmentViewPage patient={this.state.patient} /></Route>    
          <Route exact path="/studentView/assessment/submit"><AssessmentSubmitPage patient={this.state.patient} /></Route>          

          {/* Admin */}

          <Route exact path="/admin/dashboard"><AdminDashboard /></Route>
          <Route exact path="/admin/assessments/edit"><EditAssessmentPage /></Route>
          <Route exact path="/admin/vitals/edit"><EditVitalsPage /></Route>
          <Route exact path="/admin/patient/create"><CreatePatientPage /></Route>
          <Route exact path="/admin/patient/view"><ViewPatientsPage /></Route>
          <Route exact path="/admin/medication/edit"><EditMedicationsPage /></Route>

        </Switch>
      </Router>
    )
  }
}
