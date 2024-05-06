import React from 'react';
import { MedicationOrder, Time } from 'nurse-o-core';
import MedicationOrderSyntax from '../Orders/MedicationOrderSyntax';
import { Button } from '../Form/Button';
import { HoldModal } from './HoldModal';
import { Link } from 'react-router-dom';

type Props = {
    order: MedicationOrder,
    timeSlots: number[],
    simTime: Time,
    onUpdate: (order: MedicationOrder) => void
}

type State = {
    timeSlots: Map<number, TimeSlotStatus>,
    holdClicked: boolean
}

type TimeSlotStatus = JSX.Element | "-"
export default class MarEntry extends React.Component<Props, State> {

    private timeSlots: Map<number, TimeSlotStatus>;

    constructor(props: Props) {
        super(props);
        this.timeSlots = new Map<number, TimeSlotStatus>();
        this.fillTimeSlots();
        this.checkForRecordedMarData();
        this.state = {
            timeSlots: this.timeSlots,
            holdClicked: false
        }
    }

    fillTimeSlots() {
        for (const timeSlot of this.props.timeSlots) {
            this.timeSlots.set(timeSlot, "-")
        }
        return this.timeSlots
    }

    checkForRecordedMarData() {
        for (const record of this.props.order.mar) {
            const { hour, minutes, dose } = record;
            this.timeSlots.set(hour, <span>{hour.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")} <br /> {dose} </span>)
        }
    }


    isMedGivin(status: TimeSlotStatus) {
        return status !== "-"
    }

    getTimeSlotValue(hour: number) {
        const value = this.timeSlots.get(hour);
        if (!value) return <span>Error</span>
        if (this.isMedGivin(value)) {
            return <span>{value} <br /> - LK</span>
        } else {
            return <span>{value}</span>
        }

    }

    onHoldReasonSubmittedHandler(holdReason: string) {
        const order = this.props.order
        order.holdReason = holdReason
        this.props.onUpdate(order)
        this.setState({ holdClicked: false })
    }

    public render() {
        if (this.props.order.holdReason && this.props.order.holdReason.length > 0) return (
            <tr className='bg-primary/70 h-32 border border-white text-white font-semibold'>
                <td className={`w-80 pl-16 font-semibold
                                    ${this.props.order.completed ? "line-through" : null}`}>
                    <MedicationOrderSyntax order={this.props.order} />
                </td>
                <td><Button title='release this medication'
                    className='rounded-lg m-auto bg-gray-700'
                    onClick={() => this.onHoldReasonSubmittedHandler("")}
                >Release</Button></td>
                <td></td>
                <td colSpan={this.props.timeSlots.length}
                    className="pl-20">Hold Reason: {this.props.order.holdReason}</td>
            </tr>
        )




        return (
            <tr className={`odd:bg-gray-100 even:bg-gray-300 h-32 relative
                ${this.props.order.completed ? `
                after:bg-secondary after:opacity-30 after:h-full after:w-full 
                after:absolute after:inset-0 after:border-2 after:content-['Completed'] after:text-center 
                after:items-center after:grid after:font-bold after:text-5xl after:z-10` : null}
            `}>


                <td className={`w-80 pl-16 font-semibold relative
                                ${this.props.order.completed ? "line-through" : null}`}>
                    <Link to={"/studentView/mar/administer"}>
                        <MedicationOrderSyntax order={this.props.order} />
                    </Link>
                </td>
                {!this.props.order.completed ?
                    <>
                        <td className='w-32'>
                            <Button title='hold this medication' 
                            className='rounded-lg mx-2 bg-primary'
                                onClick={() => this.setState({ holdClicked: true })}
                            >HOLD</Button>
                        </td>

                        <td className='w-32'>
                            <Link to={"/studentView/mar/administer"}>
                                <Button 
                                className='rounded-lg m-auto bg-secondary mx-2'>Administer</Button>
                            </Link>
                        </td>
                    </>
                    : <><td></td><td></td></>}
                {this.props.timeSlots.map((hour, i) => {
                    if (hour === this.props.simTime.hour && !this.props.order.completed) {
                        return <td className='font-bold text-center bg-primary/20' key={i}>{this.getTimeSlotValue(hour)} </td>
                    } else {
                        return <td className='font-bold text-center' key={i}>{this.getTimeSlotValue(hour)} </td>
                    }
                }
                )}
                {this.state.holdClicked ?
                    <HoldModal onSubmit={this.onHoldReasonSubmittedHandler.bind(this)}
                        onClose={() => this.setState({ holdClicked: false })} />
                    : null}
            </tr>
        );
    }
}