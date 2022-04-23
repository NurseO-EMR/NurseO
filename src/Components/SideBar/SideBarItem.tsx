import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
    selected?: boolean,
    logo: IconProp, 
    text: string,
}


export default class SideBarItem extends React.Component<Props> {


    render() {
        return (
            <div className={`py-4 text-gray-200 text-2xl pl-10 cursor-pointer ${this.props.selected ? "bg-gray-700 font-bold": undefined}`}>
                <FontAwesomeIcon icon={this.props.logo} className="pr-4" />
                <span className='text-xl'>{this.props.text}</span>
            </div>

        );
    }
}