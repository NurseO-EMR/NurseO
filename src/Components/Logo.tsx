import React from 'react';

export default class Logo extends React.Component {

    render() {
        return (
            <div className='py-5 text-3xl text-center'>
                <span className='font-bold text-gray-200 tracking-widest'>NurseO </span>
                <span className='font-bold text-red-500 tracking-widest'>Admin</span>
            </div>
        );
    }
}