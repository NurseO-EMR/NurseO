import React from 'react';
import PureModal from "react-pure-modal";
import { CustomOrder, MedicationOrder, Order, OrderKind } from '../../../../Types/PatientProfile';
import Button from '../../../Form/Button';
import MedicationOrderSyntax from '../../../Orders/MedicationOrderSyntax';

type Props = {
    show: boolean,
    onClose: () => void,
    onOrderDeleted: (newData: Object[]) => void,
    orders: Order[]
}

export default class OrderPreviewer extends React.Component<Props> {

    componentDidMount() {
        console.log(this.props.orders)
    }

    
    remove(index: number) {
        const copy = new Array(...this.props.orders);
        copy.splice(index,1);
        this.props.onOrderDeleted(copy);
    }

    public render() {
        return (
            <PureModal isOpen={this.props.show} onClose={this.props.onClose} width="80vw" header="Orders">
                <table className='w-full text-center'>
                    <thead>
                        <th>Order Type</th>
                        <th>Order</th>
                    </thead>
                    <tbody>
                        {this.props.orders.map((order, i) =>
                            <tr className='odd:bg-gray-100 even:bg-gray-300 h-16'>
                                <td>{order.orderType}</td>
                                <td>
                                    {order.orderKind === OrderKind.med ?
                                        <MedicationOrderSyntax order={order as MedicationOrder} />:
                                        <pre>{(order as CustomOrder).order}</pre>
                                    }
                                </td>
                                <td className="border-2 overflow-hidden">
                                        <Button className="my-1" onClick={()=>this.remove(i)}>Remove</Button>
                                 </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </PureModal>
        );
    }
}