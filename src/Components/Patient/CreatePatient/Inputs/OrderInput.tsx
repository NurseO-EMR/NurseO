import { uniq } from 'lodash';
import React from 'react';
import Database from '../../../../Services/Database';
import { Medication } from '../../../../Types/Medications';
import { CustomOrder, Frequency, MedicationOrder, OrderKind, OrderType, Routine } from '../../../../Types/PatientProfile';
import ExtendableInput from '../../../Form/ExtendableInput';
import Input from '../../../Form/Input';
import SelectInput from '../../../Form/SelectInput';
import TextArea from '../../../Form/TextArea';
import DataPreviewer from '../DataPreviewer';

type Props = {
    medicalOrders: MedicationOrder[]
    customOrders: CustomOrder[], 
    onUpdate: (updatedMedicalOrders: MedicationOrder[], updatedCustomOrders: CustomOrder[])=>void,
}

type State = MedicationOrder & {
    showModal: boolean,

    customOrder: string,

    medList: Medication[]

}
export default class OrderInput extends React.Component<Props, State> {

    private customOrders: CustomOrder[];
    private medicalOrders: MedicationOrder[]


    constructor(props:Props) {
        super(props);
        this.state = {
            showModal: true,
            orderKind: OrderKind.NA,

            id: "",
            concentration: "",
            route: "",
            routine: Routine.NA,
            frequency: Frequency.NA,
            PRNNote: "",
            notes: "",
            orderType: OrderType.NA,
            mar: [],

            customOrder: "",

            medList: [],
        }

        this.customOrders = this.props.customOrders;
        this.medicalOrders = this.props.medicalOrders;
    }

    async componentDidMount() {
        const db = Database.getInstance();
        const meds = await db.getMedications();
        this.setState({
            medList: meds
        })
    }


    onSave() {
        if(this.state.orderKind === OrderKind.med) {
            const {id, concentration, route, routine, frequency, PRNNote, notes, orderType, mar, orderKind} = this.state;
            const order: MedicationOrder =  {id, concentration, route, routine, frequency, PRNNote, notes, orderType, mar, orderKind}
            this.medicalOrders.push(order);
            this.medicalOrders = uniq(this.medicalOrders);
        } else if(this.state.orderKind === OrderKind.custom){
            const {orderKind,customOrder} = this.state;
            const order: CustomOrder = {order: customOrder, orderKind};
            this.customOrders.push(order);
            this.customOrders = uniq(this.customOrders);
        }

        this.props.onUpdate(this.medicalOrders, this.customOrders);
    }




    public render() {
        return (
            <div>
                <ExtendableInput id="orderInput" label="Order" onEditClick={() => this.setState({ showModal: true })}
                    editable={this.props.medicalOrders.length > 0 || this.props.customOrders.length > 0}
                    onSave={this.onSave.bind(this)}>


                    <SelectInput label="Kind of Order" onChange={e=>this.setState({orderKind: e.currentTarget.value as OrderKind})}>
                        <option value="">click here to select</option>
                        <option value="med">Medication Order</option>
                        <option value="custom">Custom Order</option>
                    </SelectInput>

                    {this.state.orderKind === OrderKind.med ? 
                        <>
                            <SelectInput label='Medication Name' id='meds' onChange={e=>this.setState({id: e.currentTarget.value})}>
                                <option></option>
                                {this.state.medList.map((med,i)=><option key={i} value={med.id}>{med.name}</option>)}
                            </SelectInput>

                            <Input id='concentration' onChange={e=>this.setState({concentration: e.currentTarget.value})}>Concentration</Input>
                            <Input id='route' onChange={e=>this.setState({route: e.currentTarget.value})}>Route</Input>

                            <SelectInput label='routine' onChange={e=>this.setState({routine: e.currentTarget.value as Routine})}>
                                <option>click here to select</option>
                                <option value="prn">PRN</option>
                                <option value="now">NOW</option>
                                <option value="scheduled">Scheduled</option>
                            </SelectInput>

                            <SelectInput label='Frequency' onChange={e=>this.setState({frequency: e.currentTarget.value as Frequency})}>
                                <option>click here to select</option>
                                <option value="qd">qd</option>
                                <option value="q15m">q15 Minutes</option>
                                <option value="q30m">q30 Minutes</option>
                                {[...new Array(12)].map((_,i)=><option key={i+1} value={`q${i}`}>q{i+1} hr(s)</option>)}
                                <option value="qhs">QHS</option>
                            </SelectInput>

                            {this.state.routine === Routine.PRN ?
                             <Input id='PRNNote' onChange={e=>this.setState({PRNNote: e.currentTarget.value})}>PRN Note</Input> 
                            : null} 

                            <Input id='notes' onChange={e=>this.setState({notes: e.currentTarget.value})}>Notes</Input>

                            <SelectInput label='Order Type' onChange={e=>this.setState({orderType: e.currentTarget.value as OrderType})}>
                                <option>click here to select</option>
                                <option value="Admission">Admission</option>
                                <option value="Standing">Standing</option>
                                <option value="Provider">Provider</option>
                            </SelectInput>
                        </>
                    : null}


                    {this.state.orderKind === OrderKind.custom ? 
                        <TextArea cols={30} rows={10} id='custom' label='Custom Order' onChange={e=>this.setState({customOrder: e.currentTarget.value})} />
                    : null}
                   

                </ExtendableInput>

                {/* <DataPreviewer onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={data => this.props.onUpdate(data as MedicationOrder[])}
                    data={this.props.orders} show={this.state.showModal} /> */}
            </div>
        );
    }	
}