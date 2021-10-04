import React from 'react';
import DiceBear from '../../Services/DiceBear';
import BasicInfo from './BasicInfo/BasicInfo';

export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"bg-white shadow-lg h-screen w-80 " + this.props.className }>
                <img src={DiceBear.getAvatarURL("male","happy")} alt="" />
                <BasicInfo></BasicInfo>
            </div>

        );
    }
}