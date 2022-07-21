import React from 'react';
import PureModal from "react-pure-modal";
import { CustomOrder, MedicationOrder, Order, OrderKind } from 'nurse-o-core';
import MedicationOrderSyntax from './MedicationOrderSyntax';


export type Props = {
    order: Order
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
              className="hover:bg-primary hover:text-white transition-all duration-200  even:bg-gray-300 cursor-pointer">
                <td className="border-2 p-2">{this.props.order.orderType}</td>
                <td className="border-2 p-2">{"Doc Name"}</td>
                <td className="border-2 p-2">
                    {this.props.order.orderKind === OrderKind.med ? 
                    <MedicationOrderSyntax order={this.props.order as MedicationOrder}/>: 
                    <pre className='font-sans whitespace-pre-wrap'>{(this.props.order as CustomOrder).order}</pre>}
                    
                </td>
            </tr>

            <PureModal header="Order" width="60vw" className="text-center font-bold" isOpen={this.state.isModalShown} onClose={this.onModalCloseHandler.bind(this)}>
                <div>
                {this.props.order.orderKind === OrderKind.med ? <MedicationOrderSyntax order={this.props.order as MedicationOrder}/>: null}
                </div>
            </PureModal>
            </>
        );
    }
}