import EmptyCard from "./EmptyCard";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    diagnosis: string | undefined
}
export function DiagnosisCard(props:Props) {
    return <EmptyCard title="Diagnosis" {...props}>
        <div className="py-5 px-4">
            {props.diagnosis ? props.diagnosis : "No diagnosis provided yet"}
        </div>
    </EmptyCard>
}