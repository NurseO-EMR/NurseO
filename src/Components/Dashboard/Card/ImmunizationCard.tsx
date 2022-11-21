import React from 'react';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    immunizations: string[],
    preview?: boolean
}

export default class ImmunizationCard extends React.Component<Props> {

    public render() {
        return (
            <Card className={this.props.className} title="Immunizations" admin={this.props.preview}>
            <thead className="font-bold">
                <tr>
                    <td className="border-2 p-2">Taken Immunization</td>
                </tr>
            </thead>
            <tbody>
                {this.props.immunizations?.length === 0 ? 
                    <tr><td colSpan={2} className='text-center p-2'><h1>No immunizations record found</h1></td></tr>:
                    this.props.immunizations!.map((immunization,i) => <tr className='border'>
                        <td className='px-4 py-2' key={i}>{immunization}</td>
                    </tr> )
                }
            </tbody>
        </Card>

        );
    }	
}