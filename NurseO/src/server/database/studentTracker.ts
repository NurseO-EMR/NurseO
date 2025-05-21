import { type PrismaClient } from "@prisma/client";

export async function getListOfStudentPatients(db: PrismaClient) {
    const studentsPatients = await db.$queryRaw<{ patientId: number, patientName: string, patientBarCode: string, studentUID: string, studentName: string, startDateTime: Date }[]>`
        SELECT Patient.id as patientId, Patient.name as patientName, patient_bar_code as patientBarCode, studentUID, User.name as studentName, startDateTime FROM Patient 
        INNER JOIN User ON User.id = Patient.studentUID
        WHERE Patient.student_id = "casestudy"
    `
    return studentsPatients;
}


export async function getListOfStudents(db: PrismaClient) {
    const studentsPatients = await db.$queryRaw<{ id: string, name: string, email: string }[]>`SELECT id, name, email FROM User;`
    return studentsPatients;
}