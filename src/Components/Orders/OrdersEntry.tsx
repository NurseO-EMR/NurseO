import React from 'react';
import PureModal from "react-pure-modal";
import { MedicationOrder } from '../../Types/PatientProfile';
import MedicationOrderSyntax from './MedicationOrderSyntax';


export type Props = {
    order: MedicationOrder
}

export type State = {
    isModalShown: boolean,
}
export default class OrderEntry extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state = {
            isModalShown: false,
        }
    }

    onClickHandler() {
        this.setState({isModalShown: true})
    }

    onModalCloseHandler() {
        this.setState({isModalShown: false})
    }

    public render() {
        return (
            <>
            <tr onClick={this.onClickHandler.bind(this)} 
              className="hover:bg-red-700 hover:text-white transition-all duration-200  even:bg-gray-300 cursor-pointer">
                <td className="border-2 p-2">{this.props.order.orderType}</td>
                <td className="border-2 p-2">{"Doc Name"}</td>
                <td className="border-2 p-2">
                    <MedicationOrderSyntax order={this.props.order}/>
                </td>
            </tr>

            <PureModal header="Order" width="60vw" className="text-center font-bold" isOpen={this.state.isModalShown} onClose={this.onModalCloseHandler.bind(this)}>
                <div>
                    <MedicationOrderSyntax order={this.props.order}/>
                </div>
            </PureModal>
            </>
        );
    }
}