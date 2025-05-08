// SELECT Patient.name as patientName, patient_bar_code as MRN, studentUID, User.name as studentName FROM `Patient` 
// INNER JOIN User ON User.id = Patient.studentUID
// WHERE Patient.student_id = "casestudy"

import { type PrismaClient } from "@prisma/client";

export async function getListOfStudentPatients(db: PrismaClient) {
    const studentsPatients = await db.$queryRaw<{ patientId: number, patientName: string, patientBarCode: string, studentUID: string, studentName: string }[]>`
        SELECT Patient.id as patientId, Patient.name as patientName, patient_bar_code as patientBarCode, studentUID, User.name as studentName FROM Patient 
        INNER JOIN User ON User.id = Patient.studentUID
        WHERE Patient.student_id = "casestudy"
    `
    return studentsPatients;
}