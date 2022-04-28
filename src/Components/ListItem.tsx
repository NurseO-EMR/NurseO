import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'nurse-o-core';
import React from 'react';

type Props = {
    children: string
}

export default function ListItem(props: Props) {

    return (
        <li
            className='odd:bg-gray-200 even:bg-gray-400 h-16 px-5 grid grid-flow-col items-center
            font-bold my-4'>
            <FontAwesomeIcon icon={faCartShopping} />
            {props.children}
            <Button>Delete</Button>
        </li>
    );
}
