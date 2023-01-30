import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./Pages/DashboardPage"
import { Database } from "./Services/Database"
import firebaseConfig from "./firebaseConfig.json"
import CreatePatientPage from "./Pages/Patients/CreatePatientPage";
import CreateMedicationPage from "./Pages/Meds/CreateMedicationPage";
import CreateLocationPage from "./Pages/Locations/CreateLocationPage";
import { ViewPatientsPage } from "./Pages/Patients/ViewPatinetsPage";
import { EditPatientPage } from "./Pages/Patients/EditPatientPage";
import { ViewMedsPage } from "./Pages/Meds/ViewMedsPage";
import { EditMedPage } from "./Pages/Meds/EditMedPage";
import { ViewLocationsPage } from "./Pages/Locations/ViewLocationsPage";
import CreateAdminPage from "./Pages/Admins/CreateAdminPage";
import { ViewAdminsPage } from "./Pages/Admins/ViewAdminsPage";
import { RAWSettingsEditor } from "./Pages/Settings/RAWSettingsEditor";
import { LoginPage } from "./Pages/LoginPage";
import { IssuesPage } from "./Pages/IssuesPage";
import CreateCoursePage from "./Pages/Courses/CreateCoursePage";
import { ViewCoursesPage } from "./Pages/Courses/ViewCoursesPage";

export default function App() {
  Database.initialize(firebaseConfig);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          
          <Route path="/patient/create" element={<CreatePatientPage />}></Route>
          <Route path="/patient/view" element={<ViewPatientsPage />}></Route>
          <Route path="/patient/edit" element={<EditPatientPage />}></Route>

          <Route path="/meds/create" element={<CreateMedicationPage />}></Route>
          <Route path="/meds/view" element={<ViewMedsPage />}></Route>
          <Route path="/meds/edit" element={<EditMedPage />}></Route>

          <Route path="/locations/create" element={<CreateLocationPage />}></Route>
          <Route path="/locations/view" element={<ViewLocationsPage />}></Route>

          <Route path="/courses/create" element={<CreateCoursePage />}></Route>
          <Route path="/courses/view" element={<ViewCoursesPage />}></Route>

          <Route path="/admins/create" element={<CreateAdminPage />}></Route>
          <Route path="/admins/view" element={<ViewAdminsPage />}></Route>

          <Route path="/settings/rawEdit" element={<RAWSettingsEditor />}></Route>
          <Route path="/issues" element={<IssuesPage />}></Route>

        </Routes>
      </BrowserRouter>
  );
}