import React from 'react';

export default class Nav extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li className='font-bold '>
                        <span>Nurse</span>
                        <span className='text-red-500'>O</span>
                        <span> Admin</span>
                    </li>
                </ul>
            </nav>
        );
    }
}