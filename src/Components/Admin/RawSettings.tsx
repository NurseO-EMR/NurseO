import React from 'react';
import Database from '../../Services/Database';
import { Settings } from '../../Types/Settings';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import ButtonWConfirmBox from '../Form/ButtonWConfirmBox';

type Props = {}

type State = {
    settings: string
}

export default class RawSettings extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            settings: ""
        }
    }


    async componentDidMount() {
        const db = Database.getInstance();
        const settings = await db.getSettings();
        const pretty = JSON.stringify(settings, undefined, 2)
        this.setState({settings: pretty})
    }

    async onSettingsChangeHandler() {
        const json:Settings = JSON.parse(this.state.settings);
        const db = Database.getInstance();
        await db.saveSettings(json);

    }

    public render() {
        return (
            <EmptyCard admin title='Raw Settings' >
                <form>
                    <textarea name="" id="" cols={100}  rows={40} value={this.state.settings} onChange={e=>this.setState({settings: e.target.value})} className="w-full" />
                    <hr className='border-2 border-red-700 my-5' />
                    <ButtonWConfirmBox confirmPrompt='Are you sure you want to save this?' onConfirm={this.onSettingsChangeHandler.bind(this)} 
                    className="grid justify-center"
                    >Save</ButtonWConfirmBox>
                </form>
            </EmptyCard>
        );
    }
}