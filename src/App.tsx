import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from './Pages/LoginPage';
import { SelectPatient } from './Pages/SelectPatientPage';
import { Database } from './Services/Database';
import firebaseConfig from "./firebaseConfig.json";
import DashboardPage from './Pages/DashboardPage';

export default function App() {

  Database.initialize(firebaseConfig)

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