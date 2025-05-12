import { AdditionalInfoSection } from "~/components/Admin/Preview/AdditionalInfoSection"
import { StudentInfoSection } from "~/components/Admin/Preview/StudentInfoSection"
import { useParams } from "next/navigation"
import { api } from "~/utils/api"
import { createEmptyPatient } from "~/services/Util"
import AllergyCard from "~/components/EMR/Dashboard/Card/AllergyCard"
import FlagsCard from "~/components/EMR/Dashboard/Card/FlagsCard"
import MedicationCard from "~/components/EMR/Dashboard/Card/MedicationCard"
import HistoryCard from "~/components/EMR/Dashboard/Card/HistoryCard"
import SocialHistoryCard from "~/components/EMR/Dashboard/Card/SocialHistory"
import Orders from "~/components/EMR/Orders/Orders"
import ImmunizationCard from "~/components/EMR/Dashboard/Card/ImmunizationCard"
import ReportsViewer from "~/components/EMR/Reports/ReportsViewer"
import { type Order, ReportType } from "~/core"
import NotesCard from "~/components/EMR/Dashboard/Card/NotesCard"
import ArmBand from "~/components/EMR/ArmBand/ArmBand"
import { DiagnosisCard } from "~/components/EMR/Dashboard/Card/DiagnosisCard"
import { Button } from "~/components/common/ui/button"


export default function StudentPatientPreviewPage() {
    const params = useParams()
    const patientId = parseInt(params?.patientId as string)
    const patientChart = api.admin.getPatientChartById.useQuery({ patientId })
    const patient = patientChart.data ?? createEmptyPatient()
    return (
        <div className="container mx-auto py-6 px-4 ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Patient Report</h1>
                <Button variant="outline" onClick={window.print} className="flex items-center gap-2">Print/Download as PDF</Button>
            </div>

            <div id="patient-report-container" className="bg-white">

                <StudentInfoSection
                    studentId={patient.studentUID}
                    studentName={patient.studentName}
                    studentEmail={patient.studentEmail}
                />

                <div className="w-78/100 mx-auto"><ArmBand patient={patient} /></div>
                <DiagnosisCard diagnosis={patient.diagnosis} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AllergyCard allergies={patient.allergies} />
                    <FlagsCard flags={patient.flags} />
                </div>

                <HistoryCard history={patient.medicalHistory} />
                <SocialHistoryCard history={patient.socialHistory} />
                <MedicationCard medications={patient.medicationOrders} />
                <Orders showEmpty orders={[...patient.customOrders, ...patient.medicationOrders] as Order[]} />
                <ImmunizationCard immunizations={patient.immunizations} />
                <ReportsViewer reportType={ReportType.studentAssessmentReport} title="Assessment" />
                <NotesCard notes={patient.notes} />
                <AdditionalInfoSection patient={patient} />
            </div>
        </div>
    )
}
