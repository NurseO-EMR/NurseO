import React from 'react';
import PureModal from 'react-pure-modal';
import Button from '../../Form/Button';

type Props = {
    show: boolean,
    data: Object[],
    onClose: ()=>void,
    onItemDeleted: (newData: Object[]) =>void
}
export default class DataPreviewer extends React.Component<Props> {

    capitalize(word: string) {
        const array = word.split("");
        array[0] = array[0].toUpperCase();
        return array.join("");
    }

    remove(index: number) {
        const copy = new Array(...this.props.data);
        copy.splice(index,1);
        this.props.onItemDeleted(copy);
    }

    public render() {
        return (
            <PureModal isOpen={this.props.show} onClose={this.props.onClose} width="60vw">
                {this.props.data.length > 0 ?
                    <table className="w-full my-8 text-center">
                        <thead>
                            <tr>
                                {Object.keys(this.props.data[0]).map((key, i) => <th className="border-2"
                                    key={i}>{this.capitalize(key)}</th>)}
                                <th className="border-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((allergy, i) =>
                                <tr key={i}>
                                    {Object.values(allergy).map((entry, j) => <td className="border-2" key={i + j}>{this.capitalize(entry)}</td>)}
                                    <td className="border-2 overflow-hidden">
                                        <Button className="my-1" onClick={()=>this.remove(i)}>Remove</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    : <h1>No Data Available </h1>}
            </PureModal>

        );
    }
}