import React from 'react';
import ArmBand from './Components/ArmBand/ArmBand';
import Mar from './Components/Mar';
import SideNav from './Components/Nav/SideBar/SideNav';
import TopNav from './Components/Nav/TopMenu/TopNav';
import Login from './Pages/Login';
import { PatientChart } from './Types/PatientProfile';

export default class App extends React.Component {

  private readonly patient:PatientChart= {
    name: "James Smith",
    age: 18,
    dob: new Date(),
    allergies: ["Bee Sting"],
    gender: "male",
    flags: ["NPO"],
    immunizations: [],
    medicalIssues: [],
    height: 185,
    weight: 90

  }


  render() {
    return (
      // <Login></Login>
      <div className="grid grid-areas-main h-full grid-cols-twoSections">
        <TopNav className="grid-in-topNav"></TopNav>
        <ArmBand patient={this.patient} className="grid-in-armBand"></ArmBand>
        <SideNav className="grid-in-sideBar"></SideNav>
        <Mar className="grid-in-main border-t-8"/>
      </div>
    )
  }
}
