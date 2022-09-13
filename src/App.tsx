import React, { useEffect, useState } from 'react';
import './lib/react-pure-modal.min.css';
import { Route, Router, Switch } from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import DashboardPage from './Pages/StudentView/Dashboard/DashboardPage';
import { $error, $history, $locationID, $patient } from "./Services/State";
import Login from './Pages/Login';
import MARPage from "./Pages/StudentView/Mar/MARPage"
import MedicationsPage from './Pages/StudentView/Dashboard/MedicationsPage';
import AllergiesPage from './Pages/StudentView/Dashboard/AllergiesPage';
import FlagsPage from './Pages/StudentView/Dashboard/FlagsPage';
import VitalsPage from './Pages/StudentView/Vitals/VitalsPage';
import VitalsViewPage from './Pages/StudentView/Vitals/VitalsViewPage';
import Database from './Services/Database';
import { PatientNotFoundError, PatientChart } from 'nurse-o-core';
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



export default function App() {


  const [patient, setPatient] = useState(new PatientChart())
  const history = $history.value

  //init
  useEffect(() => {
    Database.initialize();
    getAnalytics();
    $error.subscribe(error => {
      if (error instanceof PatientNotFoundError) history.replace("/");
    });
  }, [history])

  useEffect(() => {
    const sub = $patient.subscribe(setPatient)
    return sub.unsubscribe
  }, [])


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const location = queryParams.get('location');
    $locationID.next(location)
    console.log(location)
  }, [])




  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/"><Login /></Route>

        <Route exact path="/studentView/selectPatient"><SelectPatient /></Route>

        <Route exact path="/studentView/dashboard"><DashboardPage patient={patient} /></Route>
        <Route exact path="/studentView/dashboard/medications"><MedicationsPage patient={patient} /></Route>
        <Route exact path="/studentView/dashboard/allergies"><AllergiesPage patient={patient} /></Route>
        <Route exact path="/studentView/dashboard/flags"><FlagsPage patient={patient} /></Route>

        <Route exact path="/studentView/mar"><MARPage patient={patient} /></Route>
        <Route exact path="/studentView/mar/administer"><AdministerMedsPage patient={patient} /></Route>

        <Route exact path="/studentView/vitals"><VitalsViewPage patient={patient} /></Route>
        <Route exact path="/studentView/vitals/view"><VitalsViewPage patient={patient} /></Route>
        <Route exact path="/studentView/vitals/submit"><VitalsPage patient={patient} /></Route>

        <Route exact path="/studentView/labs"><LabsViewerPage patient={patient} /></Route>
        <Route exact path="/studentView/labs/view"><LabsViewerPage patient={patient} /></Route>

        <Route exact path="/studentView/orders/all"><AllOrders patient={patient} /></Route>
        <Route exact path="/studentView/orders/admission"><AdmissionOrdersPage patient={patient} /></Route>
        <Route exact path="/studentView/orders/standing"><StandingOrdersPage patient={patient} /></Route>

        <Route exact path="/studentView/assessment/view"><AssessmentViewPage patient={patient} /></Route>
        <Route exact path="/studentView/assessment/submit"><AssessmentSubmitPage patient={patient} /></Route>

        <Route exact path="/studentView/io/view"><IORecordViewPage patient={patient} /></Route>
        <Route exact path="/studentView/io/submit"><IORecordSubmitPage patient={patient} /></Route>

      </Switch>
    </Router>
  )
}

