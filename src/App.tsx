import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from './Pages/LoginPage';
import { SelectPatient } from './Pages/SelectPatientPage';
import { Database } from './Services/Database';
import firebaseConfig from "./firebaseConfig.json";
import DashboardPage from './Pages/DashboardPage';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useEffect } from "react";
import { $locationID } from "./Services/State";


export default function App() {

  Database.initialize(firebaseConfig)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const location = queryParams.get('location');
    $locationID.next(location)
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/selectPatient" element={<SelectPatient />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}