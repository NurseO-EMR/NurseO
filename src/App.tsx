import React from 'react';
import ArmBand from './Components/ArmBand/ArmBand';
import Dashboard from './Components/Dashboard/Dashboard';
import Mar from './Components/Mar';
import SideNav from './Components/Nav/SideBar/SideNav';
import TopNav from './Components/Nav/TopMenu/TopNav';
import Login from './Pages/Login';
import { $patient } from './Services/State';
import { PatientChart } from './Types/PatientProfile';

type Props = {}
type State = {
  patient: PatientChart,
}
export default class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      patient: null
    }
  }

  componentDidMount() {
    $patient.subscribe((val) => {
        this.setState({
          patient: val
        }); 
        console.log("hello")
      }
    );
  }


  render() {
    return (
      // <Login></Login>
      <div className="grid grid-areas-main h-full grid-cols-twoSections">
        <TopNav className="grid-in-topNav"></TopNav>
        <ArmBand patient={this.state.patient} className="grid-in-armBand"></ArmBand>
        <SideNav className="grid-in-sideBar"></SideNav>
        <Dashboard patient={this.state.patient} className="grid-in-main border-t-8" />
        {/* <Mar className="grid-in-main"></Mar> */}
      </div>
    )
  }
}
