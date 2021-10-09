import React from 'react';
import { $settings, $vitalsSet } from '../../Services/State';
import { PatientChart } from '../../Types/PatientProfile';
import { Settings } from '../../Types/Settings';
import { VitalsSet } from '../../Types/Vitals';
import Card from '../Dashboard/Card/Card';
import TableHeader from '../TableHeader';
import VitalsHeaderTimeSlots from './VitalsHeaderTimeSlots';
import VitalsInput from './VitalsInput';

type Props =  React.HTMLAttributes<HTMLDivElement> &  {
    patient: PatientChart
}

type State = {
    vitalsSets: VitalsSet[] | null,
    settings: Settings,
}

export default class VitalsSubmitter extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            vitalsSets: null,
            settings: null
        }
    }

    componentDidMount() {
        $vitalsSet.subscribe(val=>this.setState({
            vitalsSets: val,
        }))

        $settings.subscribe(val=>this.setState({
            settings: val
        }))

    }

    public render() {	
        
        return (
            <Card title="Vitals" className="mx-2 border-l-8 border-r-8">
                {this.state.vitalsSets?.map(val=>{
                    return (
                        <>
                            <TableHeader>{val.name}</TableHeader>
                            <table className="w-11/12 ml-24">
                                <thead>
                                    <VitalsHeaderTimeSlots numberOfTimeSlots={this.state.settings?.numberOfTimeSlots}></VitalsHeaderTimeSlots>
                                </thead>

                                <tbody>
                                    {val.vitals.map(val=><VitalsInput numberOfTimeSlots={this.state.settings?.numberOfTimeSlots} vital={val} />)}
                                </tbody>
                            </table>
                        </>
                    )
                })}
            </Card>
        );
    }	
}