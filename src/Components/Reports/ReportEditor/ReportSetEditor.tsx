import React from 'react';
import { ReportSet } from '../../../Types/Report';
import ReportsSubmitter from '../ReportsSubmitter';


type Props = {

}
type State = {
    reportSets: ReportSet[]
}
export default class ReportSetEditor extends React.Component<Props,State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            reportSets: []
        }
    }

    public render() {	
        return (
            <div className="flex justify-evenly">
                <div>
                    
                </div>
    
                <ReportsSubmitter reportType="studentAssessmentReport" preview reportSets={this.state.reportSets} title="Preview" />

            </div>

        );
    }	
}