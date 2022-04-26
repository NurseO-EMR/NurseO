import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'nurse-o-core';
import React from 'react';

type Props = {
    children: string
}

export default class ListItem extends React.Component<Props> {

    render() {
        return (
            <li 
            className='odd:bg-gray-200 even:bg-gray-400 h-16 px-5 grid grid-flow-col items-center
            font-bold my-4'>
                <FontAwesomeIcon icon={faCartShopping} />
                {this.props.children}
                <Button>Delete</Button>
            </li>
        );
    }
}