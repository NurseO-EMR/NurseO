import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./Pages/DashboardPage"
import { Database } from "./Services/Database"
import firebaseConfig from "./firebaseConfig.json"
import CreatePatientPage from "./Pages/CreatePatientPage";
import CreateMedicationPage from "./Pages/CreateMedicationPage";

export default function App() {
  Database.initialize(firebaseConfig);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/patient/create" element={<CreatePatientPage />}></Route>
          <Route path="/meds/create" element={<CreateMedicationPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}