import React from 'react';
import { uniq } from 'lodash';
import ExtendableInput from './ExtendableInput';
import Input from './Input';
import DataPreviewer from '../Patient/CreatePatient/DataPreviewer';

type Props<T> = {
    data: T[],
    onUpdate: (updatedData: T[])=>void,
    defaultType: Object,
    title: string
}
type State<T> = {
    data: T | null
    showModal: boolean,
}
export default class ComplexInput<T> extends React.Component<Props<T>, State<T>> {
    private keys;

    constructor(props: Props<T>) {
        super(props);
        this.state = {
            data: null,       
            showModal: false
        }
        this.keys = Object.keys(this.props.defaultType)
    }

    onClickHandler() {
        const {data} = this.state;
        if(!data) return;
        let dataArray = new Array(...this.props.data);
        dataArray.push(data);
        dataArray = uniq(dataArray);
        this.props.onUpdate(dataArray);
    }

    camelCaseToEnglish(words: string) {
        const spaced = words.replace(/([A-Z])/g, " $1"); 
        const capitalized = spaced.replace(spaced.charAt(0), spaced.charAt(0).toUpperCase())
        return capitalized;
    }

    removeSpaces(words:string) {
        return words.replaceAll(" ", "");
    }

    onInputChangeHandler(key: string, value: string) {
        let data;
        if(!this.state.data) data = {} as T
        else data = this.state.data;

        const typedKey = key as keyof T;
        data[typedKey] = value as unknown as NonNullable<T>[keyof T]
        this.setState({data})
    }

    public render() {
        return (
            <div>
                <ExtendableInput id={this.removeSpaces(this.props.title)} label={this.props.title} onEditClick={() => this.setState({ showModal: true })}
                    editable={this.props.data.length > 0}
                    onSave={this.onClickHandler.bind(this)}>
                    {this.keys.map(key=>
                        <Input className="w-7/12" id={key} onChange={e => this.onInputChangeHandler(key, e.currentTarget.value)}>{this.camelCaseToEnglish(key)}</Input>
                    )}
                    
                </ExtendableInput>
                <DataPreviewer  onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={data=>this.props.onUpdate(data as T[])}
                    data={this.props.data} show={this.state.showModal} />
            </div>
        );
    }
}