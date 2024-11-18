import { PreAuth } from "~/components/Grad/PreAuth";
import StudentViewPage from "../_StudentViewPage";

export default function NewPage() {
    return <StudentViewPage>
        <PreAuth />
    </StudentViewPage>
}