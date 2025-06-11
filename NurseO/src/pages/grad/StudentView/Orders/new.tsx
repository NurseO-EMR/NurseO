import StudentViewPage from "../_StudentViewPage";
import { EMROrderSystem } from "~/components/Grad/emrOrderSystem";

export default function AddNewOrderPage() {
    return <StudentViewPage>
        <EMROrderSystem />
    </StudentViewPage>
}