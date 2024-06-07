import { PatientChart } from './../../../../NurseO_Core/src/Types/PatientProfile';
import { type PrismaClient } from "@prisma/client";

// async function copyPatientWStudentId(db: PrismaClient, studentId: string, templatePatientId: string) {

// }


async function getPatient(db: PrismaClient, templatePatientId: string, location: string): Promise<PatientChart> {
    const data = await db.$queryRaw`
            SELECT * FROM Patient
                LEFT JOIN Allergy ON Allergy.patient_id = Patient.id
                LEFT JOIN Custom_Order ON Custom_Order.patient_id = Patient.id
                LEFT JOIN Social_History ON Social_History.patient_id = Patient.id
                LEFT JOIN Medical_History ON Medical_History.patient_id = Patient.id
                LEFT JOIN Med_Order ON Med_Order.patient_id = Patient.id
                LEFT JOIN Immunization ON Immunization.patient_id = Patient.id
                LEFT JOIN Flag ON Flag.patient_id = Patient.id
                LEFT JOIN Student_Report ON Student_Report.patient_id = Patient.id
                LEFT JOIN Note ON Note.id = Patient.id
                WHERE patient_bar_code = ${templatePatientId}
                LIMIT 1;
            `

    p

}