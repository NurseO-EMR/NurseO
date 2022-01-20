import { groupBy, uniq } from 'lodash';
import React from 'react';
import Database from '../../../../Services/Database';
import { Medication } from '../../../../Types/Medications';
import { CustomOrder, Frequency, MedicationOrder, OrderKind, OrderType, Routine, Time } from '../../../../Types/PatientProfile';
import ComplexInput from '../../../Form/ComplexInput';
import ExtendableInput from '../../../Form/ExtendableInput';
import Input from '../../../Form/Input';
import SelectInput from '../../../Form/SelectInput';
import TextArea from '../../../Form/TextArea';
import OrderPreviewer from '../Previewer/OrderPreviewer';

type Props = {
    medicalOrders: MedicationOrder[]
    customOrders: CustomOrder[], 
    onUpdate: (updatedMedicalOrders: MedicationOrder[], updatedCustomOrders: CustomOrder[])=>void,
    admin?: boolean 
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
            showModal: false,
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

    onItemDeletedHandler(data: Object) {
        const meds = data as MedicationOrder[] | CustomOrder[];
        const grouped = groupBy(meds, "orderKind");
        this.customOrders = grouped[OrderKind.custom] as CustomOrder[] || [];
        this.medicalOrders = grouped[OrderKind.med] as MedicationOrder[] || [];
        this.props.onUpdate(this.medicalOrders, this.customOrders);
    }


    onSave() {
        if(this.state.orderKind === OrderKind.med) {
            const {id, concentration, route, routine, frequency, PRNNote, notes, orderType, mar, orderKind} = this.state;
            const order: MedicationOrder =  {id, concentration, route, routine, frequency, PRNNote, notes, orderType, mar, orderKind}
            this.medicalOrders.push(order);
            this.medicalOrders = uniq(this.medicalOrders);
        } else if(this.state.orderKind === OrderKind.custom){
            const {orderKind,customOrder, orderType} = this.state;
            const order: CustomOrder = {order: customOrder, orderKind, orderType};
            this.customOrders.push(order);
            this.customOrders = uniq(this.customOrders);
        }

        this.props.onUpdate(this.medicalOrders, this.customOrders);
    }




    public render() {
        return (
            <div>
                <ExtendableInput id="orderInput" label="Order" onEditClick={() => this.setState({ showModal: true })}
                    admin={this.props.admin}
                    editable={this.props.medicalOrders.length > 0 || this.props.customOrders.length > 0}
                    onSave={this.onSave.bind(this)}>


                    <SelectInput admin={this.props.admin} label="Kind of Order" onChange={e=>this.setState({orderKind: e.currentTarget.value as OrderKind})}>
                        <option value="">click here to select</option>
                        <option value="med">Medication Order</option>
                        <option value="custom">Custom Order</option>
                    </SelectInput>

                    {this.state.orderKind === OrderKind.med ? 
                        <>
                            <SelectInput admin={this.props.admin} label='Medication Name' id='meds' onChange={e=>this.setState({id: e.currentTarget.value})}>
                                <option></option>
                                {this.state.medList.map((med,i)=><option key={i} value={med.id}>{med.name}</option>)}
                            </SelectInput>

                            <Input admin={this.props.admin} id='concentration' onChange={e=>this.setState({concentration: e.currentTarget.value})}>Concentration</Input>
                            <Input admin={this.props.admin} id='route' onChange={e=>this.setState({route: e.currentTarget.value})}>Route</Input>

                            <SelectInput admin={this.props.admin} label='routine' onChange={e=>this.setState({routine: e.currentTarget.value as Routine})}>
                                <option>click here to select</option>
                                <option value="prn">PRN</option>
                                <option value="now">NOW</option>
                                <option value="scheduled">Scheduled</option>
                            </SelectInput>

                            <SelectInput admin={this.props.admin} label='Frequency' onChange={e=>this.setState({frequency: e.currentTarget.value as Frequency})}>
                                <option>click here to select</option>
                                <option value="qd">qd</option>
                                <option value="q15m">q15 Minutes</option>
                                <option value="q30m">q30 Minutes</option>
                                {[...new Array(12)].map((_,i)=><option key={i+1} value={`q${i}`}>q{i+1} hr(s)</option>)}
                                <option value="qhs">QHS</option>
                            </SelectInput>

                            <ComplexInput admin={this.props.admin} data={this.state.mar} defaultType={new Time()} onUpdate={mar=>this.setState({mar})} title='Mar' />

                            {this.state.routine === Routine.PRN ?
                             <Input admin={this.props.admin} id='PRNNote' onChange={e=>this.setState({PRNNote: e.currentTarget.value})}>PRN Note</Input> 
                            : null} 

                            <Input admin={this.props.admin} id='notes' onChange={e=>this.setState({notes: e.currentTarget.value})}>Notes</Input>
                        </>
                    : null}


                    {this.state.orderKind === OrderKind.custom ? 
                        <TextArea cols={30} rows={10} id='custom' label='Custom Order' onChange={e=>this.setState({customOrder: e.currentTarget.value})} />
                    : null}
                   

                   <SelectInput admin={this.props.admin} label='Order Type' onChange={e=>this.setState({orderType: e.currentTarget.value as OrderType})}>
                                <option>click here to select</option>
                                <option value="Admission">Admission</option>
                                <option value="Standing">Standing</option>
                                <option value="Provider">Provider</option>
                            </SelectInput>
                </ExtendableInput>
                
                <OrderPreviewer onClose={() => this.setState({ showModal: false })}
                    onOrderDeleted={this.onItemDeletedHandler.bind(this)}
                    orders={[...this.props.medicalOrders, ...this.props.customOrders]} show={this.state.showModal} />
            </div>
        );
    }	
}