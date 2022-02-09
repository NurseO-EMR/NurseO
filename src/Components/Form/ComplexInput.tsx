import React from 'react';
import ExtendableInput from './ExtendableInput';
import Input from './Input';
import DataPreviewer from '../Patient/CreatePatient/DataPreviewer';
import { clone } from 'lodash';

type Props<T> = {
    data: T[],
    onUpdate: (updatedData: T[])=>void,
    defaultType: Object,
    title: string,
    admin?: boolean,
    hideEditButton?: boolean,
    hideLabel?: boolean,
    className?: string,
    inputType?: "text" | "number"
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

    componentWillUnmount() {
        this.setState({
            data: null
        })
    }

    onClickHandler() {
        const {data} = this.state;
        if(!data) return;
        const dataClone = clone(data);
        const dataArray = [...this.props.data, dataClone]
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
        if(this.props.inputType === "number") {
            const parsedValue = Number.parseInt(value);
            data[typedKey] = parsedValue as unknown as NonNullable<T>[keyof T]
        } else {
            data[typedKey] = value as unknown as NonNullable<T>[keyof T]
        }
        this.setState({data})
    }

    public render() {
        return (
            <div>
                <ExtendableInput  admin={this.props.admin} id={this.removeSpaces(this.props.title)} label={this.props.title} 
                    hideEditButton={this.props.hideEditButton}
                    hideLabel={this.props.hideLabel}
                    onEditClick={() => this.setState({ showModal: true })}
                    editable={this.props.data.length > 0}
                    className={this.props.className}
                    onSave={this.onClickHandler.bind(this)}>
                    {this.keys.map((key,i)=>
                        <Input className="w-7/12" key={i} id={key} admin={this.props.admin} type={this.props.inputType}
                        onChange={e => this.onInputChangeHandler(key, e.currentTarget.value)}>{this.camelCaseToEnglish(key)}</Input>
                    )}
                    
                </ExtendableInput>
                <DataPreviewer  onClose={() => this.setState({ showModal: false })}
                    onItemDeleted={data=>this.props.onUpdate(data as T[])}
                    data={this.props.data} show={this.state.showModal} />
            </div>
        );
    }
}