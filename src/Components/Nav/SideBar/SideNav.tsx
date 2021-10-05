import React from 'react';
import DiceBear from '../../../Services/DiceBear';
import Section from './Section/Section';
import SectionItem from './Section/SectionItem';
import SectionNamedInfo from './Section/SectionNamedInfo';

export default class SideNav extends React.Component<React.HTMLAttributes<HTMLDivElement>> {
    
    public render() {
        return (
            <div className={"shadow-lg h-screen w-80 pt-1 " + this.props.className }>
                {/* <img className="rounded mb-3" src={DiceBear.getAvatarURL("male","sad")} alt="" /> */}
                <Section title="Basic Info">
                    <SectionNamedInfo name="Name">James Thompson</SectionNamedInfo>
                    <SectionNamedInfo name="DOB">March 4th, 1968</SectionNamedInfo>
                    <SectionNamedInfo name="Age">12 Years old</SectionNamedInfo>
                    <SectionNamedInfo name="Allergy">Pineapple</SectionNamedInfo>
                </Section>
                <Section title="Medications">
                    <SectionItem>{"Acetaminophen (0.15mg/kg) 6HR PRN temp > 39.5 or discomfort"}</SectionItem>
                    <SectionItem>{"Acetaminophen (0.15mg/kg) 6HR PRN temp > 39.5 or discomfort"}</SectionItem>
                    <SectionItem>{"Acetaminophen (0.15mg/kg) 6HR PRN temp > 39.5 or discomfort"}</SectionItem>
                    <SectionItem>{"Acetaminophen (0.15mg/kg) 6HR PRN temp > 39.5 or discomfort"}</SectionItem>
                </Section>
            </div>

        );
    }
}