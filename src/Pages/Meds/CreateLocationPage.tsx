import { Input } from 'nurse-o-core';
import React from 'react';
import ButtonWModalPrompt from '../../Components/Form/ButtonWModalPrompt';
import ListItem from '../../Components/ListItem';
import PageView from '../PageView';

export default function CreateLocationPage() {
    return (
        <PageView>
            <form onSubmit={e => e.preventDefault()} className="">
                <Input id='locationName' className='grid-flow-col'>Location Name</Input>
                <ButtonWModalPrompt onSubmit={console.log} inputLabel='Nursing Station Name'>
                    Add nursing station
                </ButtonWModalPrompt>

                <ul>
                    <ListItem>UHH - NurseA</ListItem>
                    <ListItem>UHH - NurseB</ListItem>
                    <ListItem>UHH - NurseC</ListItem>
                    <ListItem>UHH - NurseD</ListItem>

                </ul>
            </form>
        </PageView>

    );
}