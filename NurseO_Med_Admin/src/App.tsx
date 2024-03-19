import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from './Pages/LoginPage';
import { SelectPatient } from './Pages/SelectPatientPage';
import { Database } from './Services/Database';
import firebaseConfig from "./firebaseConfig.json";
import DashboardPage from './Pages/DashboardPage';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useEffect } from "react";
import { $locationID, $showVerify } from "./Services/State";
import { AZListing } from "./Pages/AZListing";
import { getLocationFromStorage, getVerifyFromStorage, storeLocation, storeVerify } from "./Services/LocalStorage";


export default function App() {

  Database.initialize(firebaseConfig)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let location = queryParams.get('location');
    let showVerify = queryParams.get('showVerify');
    if(location) storeLocation(location)
    else location = getLocationFromStorage()

    if(showVerify) storeVerify(showVerify)
    else showVerify = getVerifyFromStorage()


    $locationID.next(location)
    $showVerify.next(showVerify === "true")
    console.log("location: " + location)
    console.log("show verify: " + (showVerify === "true"))
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/selectPatient" element={<SelectPatient />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/AZListing" element={<AZListing />} />
      </Routes>
    </BrowserRouter>
  );
}