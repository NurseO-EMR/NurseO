import { $history } from 'nurse-o-core';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import CreateLocationPage from './Pages/Meds/CreateLocationPage';
import EditLocationsPage from './Pages/Meds/EditLocationsPage';

export default class App extends React.Component {

  private history = $history.value

  render() {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/medications/locations/edit" element={<EditLocationsPage />} />
          <Route path="/medications/locations/create" element={<CreateLocationPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}