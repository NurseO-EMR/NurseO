import React from 'react';
import PureModal from "react-pure-modal"
import {sampleMed} from "./../../Services/Core"
export default class Name extends React.Component {

    render() {
        return (
            <PureModal width='60vw' header="Acetaminophen 10mg/kg PO q7hr PRN" isOpen={true}>
                <div>
                    <h1 className='font-bold text-red-700 text-center'>
                        Acetaminophen 10mg/kg PO q7hr PRN
                    </h1>
                    <h2>Supplied As</h2>
                    <table className='w-full m-auto'>
                        <thead>
                            <tr className='text-left'>
                                <th className='pl-5'>Name</th>
                                <th>Drawer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sampleMed.location[0].supply.map((supply,i)=>
                                <tr key={i} className='h-16 odd:bg-gray-100 even:bg-gray-300 '>
                                    <td className='pl-5'>{supply.name}</td>
                                    <td>{supply.drawer}</td>
                                </tr>    
                            
                            
                            )}
                        </tbody>
                    </table>
                </div>
            </PureModal>
        );
    }
}