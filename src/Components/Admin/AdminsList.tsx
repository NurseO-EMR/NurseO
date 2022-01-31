import React from 'react';
import PureModal from "react-pure-modal";
import Database from '../../Services/Database';
import EmptyCard from '../Dashboard/Card/EmptyCard';
import Button from '../Form/Button';
import ButtonWConfirmBox from '../Form/ButtonWConfirmBox';
import Input from '../Form/Input';

type Props = {}
type State = {
    adminEmails: string[],
    showAdder: boolean,
    adminEmailToBeAdded: string,
}
export default class AdminsList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            adminEmails: [],
            showAdder: false,
            adminEmailToBeAdded: "",
        }
    }

    async componentDidMount() {
        const db = Database.getInstance();
        const emails = await db.getAdminList();
        this.setState({ adminEmails: emails })
    }

    async onDeleteClickHandler(index:number) {
        const {adminEmails} = this.state;
        const db = Database.getInstance();
        adminEmails.splice(index,1);
        await db.updateAdminList(adminEmails);
        this.setState({adminEmails});
    }  
    
    async addAdmin() {
        const {adminEmails} = this.state;
        const db = Database.getInstance();
        adminEmails.push(this.state.adminEmailToBeAdded);
        await db.updateAdminList(adminEmails);
        this.setState({
            adminEmails,
            showAdder: false,
            adminEmailToBeAdded: ""
        });
    }

    public render() {
        return (
            <EmptyCard title='Add/Remove Admins' admin className='w-70vw block m-auto'>
                <table className='w-full text-center'>
                    <thead>
                        <tr>
                            <th>Admin Emails</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.adminEmails.map((e,i) =>
                            <tr className='odd:bg-gray-100 even:bg-gray-300 py-5 h-16' key={i}>
                                <td>{e}</td>
                                <td><ButtonWConfirmBox className='bg-primary' onConfirm={() => this.onDeleteClickHandler(i)} 
                                confirmPrompt={`Are you sure you want to delete ${this.state.adminEmails[i]}?`}
                                >Delete</ButtonWConfirmBox></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='flex justify-end w-11/12 mt-5'>
                    <Button admin onClick={()=>this.setState({showAdder: true})}>Add Admin</Button>
                </div>

                <PureModal isOpen={this.state.showAdder} onClose={()=>this.setState({showAdder: false})} header="Add Admin" width='35vw'>
                    <form onSubmit={e=>e.preventDefault()}>
                        <Input onChange={e=>this.setState({adminEmailToBeAdded: e.currentTarget.value})} 
                        type='email' admin id='adminEmail'>Admin Email</Input>
                        <Button onClick={this.addAdmin.bind(this)} className='w-11/12' admin>Add</Button>
                    </form>
                </PureModal>
            </EmptyCard>

        );
    }
}