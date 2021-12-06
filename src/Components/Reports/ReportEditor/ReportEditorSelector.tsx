import React from 'react';
import { take } from 'rxjs';
import { $settings } from '../../../Services/State';
import { ReportSet } from '../../../Types/Report';


type Props = {

}
type State = {
    reportSets: ReportSet[]
}
export default class ReportEditorSelector extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            reportSets: []
        }
    }

    componentDidMount() {
        $settings.pipe(take(2)).subscribe(setting=>{
            if(setting?.reportSet) {
                this.setState({reportSets:setting.reportSet});
            }
        })
    }

    public render() {
        return (
            <div className="text-center">
                <h1 className="font-bold text-3xl">Which assessment would you like to edit?</h1>
                <div className="grid grid-cols-4 gap-5 mt-10">
                    {this.state.reportSets.map(reportSet=>
                            <button className="bg-red-700 text-white p-10 rounded-lg font-bold">{reportSet.name}</button>
                    )}
                    <button className="bg-red-700 text-white p-10 rounded-lg font-bold">Other</button>
                </div>
            </div>

        );
    }
}