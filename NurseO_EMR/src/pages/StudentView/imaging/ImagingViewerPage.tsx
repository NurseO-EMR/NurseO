import React from 'react';
import LabViewer from '../../../Components/Labs/LabViewer';
import { PatientChart } from "@nurse-o-core/index";
import StudentViewPage from '../_StudentViewPage';


type Props = {
    patient:PatientChart
}
export default class ImagingViewerPage extends React.Component<Props> {

    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                <LabViewer title='Imaging' docLink={this.props.patient.imagingURL}></LabViewer>
            </StudentViewPage>

        );
    }	
}