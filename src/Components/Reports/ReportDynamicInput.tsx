import React, { ChangeEvent } from 'react';
import { ReportInputType, ReportOptions } from '../../Types/Report';

type Props = {
    fieldType: ReportInputType,
    index: number,
    onChange: (value: string, key: number) => void,
    disabled?: boolean,
    options?: ReportOptions,

}

export default class ReportDynamicInput extends React.Component<Props> {
    private readonly inputStyle = "w-9/12 max-w-xs border border-black disabled:bg-gray-300 disabled:cursor-not-allowed";
    private checkBoxChecked: Set<String> = new Set<String>();

    onInputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        this.props.onChange(value, key);
    }

    onSelectChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        const key: number = Number.parseInt(event.target.name);
        const value = event.target.value;
        this.props.onChange(value, key);
    }

    onCheckBoxChecked(value: string, checked: boolean, key: number) {
        if(checked) {
            this.checkBoxChecked.add(value);
        } else {
            this.checkBoxChecked.delete(value);
        }

        const output = [...this.checkBoxChecked].toString().replaceAll(",", ", ")
        this.props.onChange(output,key);
    }


    public render() {
        return (
            <>
                {this.props.fieldType === "text" ?
                    <input name={this.props.index.toString()} onChange={this.onInputChangeHandler.bind(this)} className={this.inputStyle + " "}
                        type="text" disabled={this.props.disabled} /> : null}


                {this.props.fieldType === "number" ?
                    <input name={this.props.index.toString()} onChange={this.onInputChangeHandler.bind(this)} className={this.inputStyle}
                        type="number" disabled={this.props.disabled} /> : null}


                {this.props.fieldType === "T/F" ?
                    <select name={this.props.index.toString()} onChange={this.onSelectChangeHandler.bind(this)} className={this.inputStyle}
                        disabled={this.props.disabled}>
                        <option></option>
                        <option>Y</option>
                        <option>N</option>
                    </select> : null}


                {this.props.fieldType === "checkbox" ?
                    <div className="flex flex-wrap gap-5 w-1/2">
                        {this.props.options?.map((val, j) =>
                            <div key={this.props.index + j} className="flex items-center gap-2" >
                                <input type="checkbox" disabled={this.props.disabled} onChange={e=>this.onCheckBoxChecked(val.name, e.target.checked, this.props.index)} />
                                <label>{val.name}</label>
                            </div>
                        )}
                    </div>
                    : null}



                {this.props.fieldType === "options" ?
                    <select name={this.props.index.toString()} onChange={this.onSelectChangeHandler.bind(this)} className={this.inputStyle} disabled={this.props.disabled}>
                        <option></option>
                        {this.props.options!.map((val, i) => <option key={i} title={val.name}>{val.name}</option>)}
                    </select>
                    : null}
            </>

        );
    }
}