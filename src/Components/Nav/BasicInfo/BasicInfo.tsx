import React from 'react';
import BasicInfoItem from './BasicInfoItem';
export default class BasicInfo extends React.Component {

    public render() {
        return (
            <div className="basicInfo">
                <BasicInfoItem name="Name">James</BasicInfoItem>
                <BasicInfoItem name="Age">12</BasicInfoItem>
            </div>

        );
    }
}