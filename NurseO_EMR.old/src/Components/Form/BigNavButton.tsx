import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
    linkTo: string,
    backgroundColorClassName: string, 
    text: string,
    icon: IconProp
}

export default class BigNavButton extends React.Component<Props> {

    public render() {	
        return (
            <Link to={this.props.linkTo}>
                <div className={`grid justify-center w-144 cursor-pointer ${this.props.backgroundColorClassName} transform hover:scale-105 transition-all`}>
                    <FontAwesomeIcon icon={this.props.icon} className='text-9xl text-white my-5 mx-auto block'/>
                    <h1 className='font-bold text-2xl text-white tracking-widest my-3'>{this.props.text}</h1>
                </div>
            </Link>
        );
    }	
}