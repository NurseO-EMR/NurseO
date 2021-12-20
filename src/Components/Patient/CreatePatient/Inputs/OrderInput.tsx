import React from 'react';
import { Frequency, MedicationOrder, OrderKind, OrderType, Routine } from '../../../../Types/PatientProfile';
import ExtendableInput from '../../../Form/ExtendableInput';
import Input from '../../../Form/Input';
import SelectInput from '../../../Form/SelectInput';
import TextArea from '../../../Form/TextArea';
import DataPreviewer from '../DataPreviewer';

type Props = {
    medicalOrders: MedicationOrder[]
    customOrders: string[], 
    onUpdate: (updatedData: MedicationOrder[] | string[])=>void,
}

type State = {
    showModal: boolean,
    orderKind: OrderKind | "",

    medID: string,
    concentration: string,
    route: string,
    routine: Routine,
    Frequency: Frequency,
    Note: string,
    OrderType: OrderType,

}
export default class OrderInput extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state = {
            showModal: true,
            orderKind: "",
            medID: "",
            concentration: "",
            route: "",
            routine: Routine.NA,
            Frequency: Frequency.NA,
            Note: "",
            OrderType: OrderType.NA,
        }
    }

    public render() {
        return (
            <div>
                <ExtendableInput id="orderInput" label="Order" onEditClick={() => this.setState({ showModal: true })}
                    editable={this.props.medicalOrders.length > 0 || this.props.customOrders.length > 0}
                    onSave={console.log}>


                    <SelectInput label="Type of Order" onChange={e=>this.setState({orderKind: e.currentTarget.value as OrderKind})}>
                        <option value="">click here to select</option>
                        <option value="med">Medication Order</option>
                        <option value="custom">Custom Order</option>
                    </SelectInput>

                    {this.state.orderKind === OrderKind.med ? 
                        <>
                            <Input id='med'>Medication Name</Input>
                            <Input id='concentration'>Concentration</Input>
                            <Input id='route'>Route</Input>
                            <SelectInput label='routine'>
                                <option>click here to select</option>
                                <option value="prn">PRN</option>
                                <option value="now">NOW</option>
                                <option value="scheduled">Scheduled</option>
                            </SelectInput>
                            <SelectInput label='Frequency' onChange={e=>this.setState({routine: e.currentTarget.value as Routine})}>
                                <option>click here to select</option>
                                <option value="qd">qd</option>
                                <option value="q15m">q15 Minutes</option>
                                <option value="q30m">q30 Minutes</option>
                                {[...new Array(12)].map((_,i)=><option key={i+1} value={`q${i}`}>q{i+1} hr(s)</option>)}
                                <option value="qhs">QHS</option>
                                
                                
                            </SelectInput>
                            {this.state.routine === Routine.PRN ? <Input id='PRNNote'>PRN Note</Input> : null} 
                            <Input id='notes'>Notes</Input>
                            <SelectInput label='Order Type'>
                                <option>click here to select</option>
                                <option value="Admission">Admission</option>
                                <option value="Standing">Standing</option>
                                <option value="Provider">Provider</option>
                            </SelectInput>
                        </>
                    : null}


                    {this.state.orderKind === OrderKind.custom ? 
                        <TextArea cols={30} rows={10} id='custom' label='Custom Order' />
                    : null}
                   

                </ExtendableInput>

                {/* <DataPreviewer onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={data => this.props.onUpdate(data as MedicationOrder[])}
                    data={this.props.orders} show={this.state.showModal} /> */}
            </div>
        );
    }	
}