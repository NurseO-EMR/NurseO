import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./Pages/DashboardPage"
import { Database } from "./Services/Database"
import firebaseConfig from "./firebaseConfig.json"
import CreatePatientPage from "./Pages/Patients/CreatePatientPage";
import CreateMedicationPage from "./Pages/Meds/CreateMedicationPage";
import CreateLocationPage from "./Pages/Locations/CreateLocationPage";

export default function App() {
  Database.initialize(firebaseConfig);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/patient/create" element={<CreatePatientPage />}></Route>
          <Route path="/meds/create" element={<CreateMedicationPage />}></Route>
          <Route path="/locations/create" element={<CreateLocationPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}