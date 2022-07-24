import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from './Pages/LoginPage';
import { SelectPatient } from './Pages/SelectPatientPage';
import { Database } from './Services/Database';
import firebaseConfig from "./firebaseConfig.json";
import DashboardPage from './Pages/DashboardPage';
import 'react-pure-modal/dist/react-pure-modal.min.css';


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