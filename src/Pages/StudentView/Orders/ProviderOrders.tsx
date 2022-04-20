import React from 'react';
import PureModal from 'react-pure-modal';
import Orders from '../../../Components/Orders/Orders';
import { $history, $providerOrdersAvailable } from '../../../Services/State';
import { Order, OrderType, PatientChart } from '../../../Types/PatientProfile';
import StudentViewPage from '../StudentViewPage';

type Props = {
    patient: PatientChart
}

type State = {
    orders: Order[],
    providerOrdersAvailable: boolean
}
export default class ProviderOrdersPage extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state={
            orders: [],
            providerOrdersAvailable: false
        }
    }

    componentDidMount() {
        if($providerOrdersAvailable.value) {
            this.onYesHandler();
        }
    }

    onYesHandler() {
        this.setState({
            orders: [...this.props.patient.medicationOrders, ...this.props.patient.customOrders],
            providerOrdersAvailable: true,
        })

        $providerOrdersAvailable.next(true);
    }

    onNoHandler() {
        $history.value.goBack();
    }


    public render() {	
        return (
            <StudentViewPage patient={this.props.patient}>
                {this.state.providerOrdersAvailable ? <Orders orderType={OrderType.provider} orders={this.state.orders}></Orders>: null}
                
                
                <PureModal header="Provider Orders" isOpen={!this.state.providerOrdersAvailable} width="60vw">
                    <div className="text-center">
                        <h1 className="font-bold text-3xl my-6 py-6 ">Did you receive orders verbally or over the phone?</h1>

                        <div className="flex justify-center gap-x-20 my-4">
                            <button className="bg-green-700 text-white py-4 px-16 rounded-full font-bold cursor-pointer" 
                                onClick={this.onYesHandler.bind(this)}>Yes</button>
                            <button className="bg-red-700 text-white py-4 px-16 rounded-full font-bold cursor-pointer"  
                                onClick={this.onNoHandler.bind(this)}>No</button>
                        </div>
                    </div>
                </PureModal>

            </StudentViewPage>
        );
        
    }	
}