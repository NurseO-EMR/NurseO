import React from 'react';
import TopNav from '../../Components/Nav/TopMenu/TopNav';
import {getAuth} from "firebase/auth"
// import { $history } from '../../Services/State';
type Props = {
    selected: "Dashboard" | "Create Patient" | "View Patients" | "Edit Assessment"
}
export default class AdminViewPage extends React.Component<Props> {

    componentDidMount() {
        // if(!getAuth().currentUser) $history.value.push("/")
        console.log(getAuth().currentUser)
    }

    public render() {	
        return (
            <div>
                <TopNav>
                    <ul className="flex gap-10">
                        <li className={`cursor-pointer ${this.props.selected === "Dashboard" ? "font-bold" : null}`}><a href="/admin/dashboard">Dashboard</a></li>
                        <li className={`cursor-pointer ${this.props.selected === "Create Patient" ? "font-bold" : null}`}><a href="/admin/patient/create">Create Patient</a></li>
                        <li className={`cursor-pointer ${this.props.selected === "View Patients" ? "font-bold" : null}`}><a href="/admin/dashboard">View Patients</a></li>
                        <li className={`cursor-pointer ${this.props.selected === "Edit Assessment" ? "font-bold" : null}`}><a href="/admin/assessments/edit">Edit Assessments</a></li>
                    </ul>
                </TopNav>
                <div className="px-40 py-1">
                    {this.props.children}
                </div>
            </div>

        );
    }	
}