import { Report, ReportType, StudentReport } from "nurse-o-core";
import { useEffect, useState } from "react";
import { Button } from "../../Form/Button";
import { Input } from "../../Form/Input";
import { SearchableSelect } from "../../Form/SearchableSelect";
import { Td } from "../../Table/Td";
import { Tr } from "../../Table/Tr";

type Props = {
    type: ReportType,
    options: Report[],
    onSave: (report:StudentReport[]) => void
}

export function ReportDynamicTable(props: Props) {
    
    const [table, setTable] = useState<string[][]>([])
    const [options, setOptions] = useState<{name:string}[]>(props.options.map(o=>{return {name:o.name}}))

    useEffect(()=>{
        const InitialTable = [
            ["", "", ""],
            ["", "", ""],
            ["","",""]
        ]
        
        setOptions([...props.options.map(o=>{return {name:o.name}})])
        setTable([...InitialTable])
    },[props.options])


    const onKeyChangeHandler = (row:number, value:string)=>{
        table[row][0] = value
        updateTable(table)
    }

    const onKeyCreateHandler = (row:number, value:string)=>{
        const key = {name:value}
        options.push(key)
        table[row][0] = value

        setOptions([...options])
        updateTable(table)
    }

    const onTimeupdateHandler=(column:number, value:string) => {
        table[0][column] = value
        updateTable(table)
    }

    const onValueChangeHandler = (row:number, column:number, value:string) =>{
        table[row][column] = value
        updateTable(table)
    }

    const updateTable = (table:string[][])=>{
        // if last row has a key add an empty row
        if(table[table.length-1][0].length > 0) table.push(new Array<string>(table[0].length).fill("",0,table[0].length))
        

        // if the last column is filled add another column
        if(table[0][table[0].length-1].length > 0) {
            for(let rowIndex = 0; rowIndex<table.length; rowIndex++) {
                table[rowIndex].push("")
            }
        }

        setTable([...table])
    }


    const onSaveClickHandler = ()=>{
        const times = table[0]
        const reports:StudentReport[] = []

        // -1 to remove the last row as that is the new one
        // start from 1 as 0 is the times
        for(let row = 1; row<table.length-1; row++) {
            const key = table[row][0]

            // -1 to remove the last column as that is the last one
            //start from one as 0 is the keys 
            for(let column = 1; column<table[row].length-1; column++) {

                const report:StudentReport = {
                    date: times[column],
                    reportType: props.type,
                    setName: "",
                    time: "",
                    value: table[row][column],
                    vitalName: key
                }
                reports.push(report)
            }

        }

        props.onSave(reports)
        
    }

    return <div className="my-2">
        <table className="w-full relative">
            <tbody>
                {table.map((row,rowIndex)=><Tr key={rowIndex}>
                    {row.map((cell,columnIndex)=>{
                        // top left corner should have nothing 
                        if(rowIndex+columnIndex === 0) return <Td key={columnIndex}><Input hideLabel label={"Empty"} value={`Time/${reportTypeToWords(props.type)}`} readOnly disabled/></Td>
                        //keys
                        else if (columnIndex === 0) return <Td key={columnIndex}><SearchableSelect hideLabel
                                                                 label={""} options={options} value={cell}
                                                                 labelKeys={["name"]} valueKey={"name"} creatable
                                                                 onChange={v=>onKeyChangeHandler(rowIndex,v)}
                                                                 onCreateOption={v=>onKeyCreateHandler(rowIndex,v)}
                                                                 /></Td>

                        // time
                        if(rowIndex === 0) return <Td key={columnIndex}><Input hideLabel label="Day/Time" placeholder="Day/Time"
                         value={cell} onChange={e=>onTimeupdateHandler(columnIndex, e.currentTarget.value)} optional/></Td>

                        // values
                        else return <Td key={columnIndex}><Input hideLabel label={"value"} value={cell}
                                        disabled={table[0][columnIndex].length===0} optional
                                        onChange={e=>onValueChangeHandler(rowIndex, columnIndex,e.currentTarget.value)}/></Td>
                    })}
                </Tr>)}
            </tbody>
        </table>
        <Button className="w-full bg-blue mt-5" onClick={onSaveClickHandler}>Save</Button>
    </div>
}


function reportTypeToWords(type:ReportType) {
    switch(type) {
        case "studentAssessmentReport": return "Assessment";
        case "studentIOReport": return "Record";
        case "studentVitalsReport": return "Vital";
        case "studentLabReport": return "Lab";    
    }
}