import React from 'react';
import Card from './Card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    history: string[],
}
export default class SocialHistoryCard extends React.Component<Props> {

    public render() {
        return (
            <Card className={this.props.className} title="Social History">
                <thead className="font-bold">
                    <tr>
                        <td className="border-2 p-2 border-trueGray-200">Entry</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.history?.length === 0 ?
                        <tr><td colSpan={2} className='text-center p-2'><h1>No records found</h1></td></tr> :
                        this.props.history.map((history, i) =>
                            <tr key={i}>
                                <td className="border-2 p-2 border-trueGray-200">{history}</td>
                            </tr>)
                    }
                </tbody>
            </Card>
        )

    }
}