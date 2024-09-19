import EmptyCard from "./EmptyCard";

type Props = React.HTMLAttributes<HTMLDivElement> & {
    chiefComplaint: string | undefined | null
}
export function ChiefComplaintCard(props: Props) {
    return <EmptyCard title="Chief Complaint" {...props}>
        <div className="py-5 px-4">
            {props.chiefComplaint ? props.chiefComplaint : "None provided yet"}
        </div>
    </EmptyCard>
}