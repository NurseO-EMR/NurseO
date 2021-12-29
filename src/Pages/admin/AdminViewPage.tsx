import React from 'react';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import {getAuth} from "firebase/auth"
import { Link } from 'react-router-dom';
import { $history } from '../../Services/State';
// import { $history } from '../../Services/State';
type Props = {
    selected: "Dashboard" | "Create Patient" | "View Patients" | "Edit Assessment" | "Edit Vitals"
}
export default class AdminViewPage extends React.Component<Props> {

    private selectedColor = "font-bold text-primary";

    componentDidMount() {
        if(!getAuth().currentUser) $history.value.push("/")
    }

    public render() {	
        return (
            <div>
                <TopNav>
                    <ul className="flex gap-10">
                        <li className={`cursor-pointer ${this.props.selected === "Dashboard" ? this.selectedColor : null}`}><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li className={`cursor-pointer ${this.props.selected === "Create Patient" ? this.selectedColor : null}`}><Link to="/admin/patient/create">Create Patient</Link></li>
                        <li className={`cursor-pointer ${this.props.selected === "View Patients" ? this.selectedColor : null}`}><Link to="/admin/patient/view">View Patients</Link></li>
                        <li className={`cursor-pointer ${this.props.selected === "Edit Assessment" ? this.selectedColor : null}`}><Link to="/admin/assessments/edit">Edit Assessments</Link></li>
                        <li className={`cursor-pointer ${this.props.selected === "Edit Vitals" ? this.selectedColor : null}`}><Link to="/admin/vitals/edit">Edit Vitals</Link></li>
                    </ul>
                </TopNav>
                <div className="px-10 py-1">
                    {this.props.children}
                </div>
            </div>

        );
    }	
}