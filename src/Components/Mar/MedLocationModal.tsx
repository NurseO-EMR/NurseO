import React from 'react';
import PureModal from "react-pure-modal"
import {MedicationModified, MedSupply} from "./../../Services/Core"
import {Button} from "nurse-o-core"
import VerifyPopup from './VerifyPopup';
import { filter } from 'lodash';

type Props = {
    med: MedicationModified | null,
    onClose: ()=>void
}

type State = {
    supplies: MedSupply[],
    medToBeVerified: MedSupply | null
}
export default class MedicationModal extends React.Component<Props, State> {


    constructor(props:Props) {
        super(props);
        this.state = {
            supplies: this.getMedSupplies(),
            medToBeVerified: null
        }
    }

    getMedSupplies(): MedSupply[] {
        if(!this.props.med) return [];
        const building = "UHH";
        const station = "NurseA";
        const filteredLocations = filter(this.props.med.locations, {building, station})
        //there should be only one left
        if(filteredLocations.length === 0) return []
        return filteredLocations[0].supply;
    }

    onMedVerify(medSupply: MedSupply) {
        this.setState({medToBeVerified: medSupply})
    }

    onMedVerified() {
        this.setState({
            medToBeVerified: null
        })
        this.props.onClose();
    }

    render() {
        return (
            <PureModal width='60vw' header="Order" isOpen={true} onClose={this.props.onClose}>
                <div>
                    <h1 className='font-bold text-lg py-2 text-red-700 text-center'>
                        Acetaminophen 10mg/kg PO q7hr PRN
                    </h1>
                    {this.state.supplies.length > 0 ?
                    <table className='w-full m-auto'>
                        <thead>
                            <tr className='text-left h-10'>
                                <th className='pl-5'>Medication</th>
                                <th>Drawer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplies.map((supply,i)=>
                                <tr key={i} className='h-16 odd:bg-gray-100 even:bg-gray-300 '>
                                    <td className='pl-5'>{supply.name}</td>
                                    <td>{supply.drawer}</td>
                                    <td><Button onClick={()=>this.onMedVerify(supply)}>Verify</Button></td>
                                </tr>    
                            )}
                        </tbody>
                    </table>: 
                    <h1 className='text-center font-bold py-6'>Medication is not available, please call pharmacy</h1>
                    }

                    {this.state.medToBeVerified ? 
                        <VerifyPopup med={this.state.medToBeVerified}
                         onVerified={this.onMedVerified.bind(this)} 
                         onClose={this.onMedVerified.bind(this)}/> 
                    : null}
                    
                </div>
            </PureModal>
        );
    }
}