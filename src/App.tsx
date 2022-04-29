import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./Pages/DashboardPage"
import CreateLocationPage from "./Pages/Meds/CreateLocationPage"
import EditLocationsPage from "./Pages/Meds/EditLocationsPage"
import { Database } from "./Services/Database"
import firebaseConfig from "./firebaseConfig.json"
import { EditMedicationsPage } from "./Pages/Meds/EditMedicationsPage"

export default function App() {
  Database.initialize(firebaseConfig);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="/medications/edit" element={<EditMedicationsPage />} />
        <Route path="/medications/locations/edit" element={<EditLocationsPage />} />
        <Route path="/medications/locations/create" element={<CreateLocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}