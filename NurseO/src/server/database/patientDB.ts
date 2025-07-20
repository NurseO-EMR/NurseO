import type { PatientChart } from "~/core/index";
import { type PrismaClient } from "@prisma/client";
import type { Response } from "~/types/protocolTypes";

export async function getPatientList(db: PrismaClient) {
    const patients = await db.$queryRaw<{ id: number, name: string, dob: string, barcode: string, courseName: string, courseId: number }[]>`
        SELECT Patient.id, Patient.name, dob, patient_bar_code as barcode, Course.name as courseName, Course.id as courseId
        FROM Patient 
        LEFT JOIN Course ON Course.id = Patient.course_id
        WHERE template = true
        AND deleted = false;
    `
    return patients
}

export async function deletePatient(db: PrismaClient, patientId: number): Response<boolean> {
    try {
        await db.patient.update({
            data: {
                deleted: true
            }, where: {
                id: patientId
            }
        })
        return { err: null, data: true }
    } catch (e) {
        return { err: String(e), data: false }
    }
}

export async function addPatientWMetaDataOnly(db: PrismaClient, patient: PatientChart) {
    const data = await db.patient.create({
        data: {
            name: patient.name,
            dob: patient.dob,
            gender: patient.gender,
            height: patient.height,
            weight: patient.weight,
            diagnosis: patient.diagnosis,
            age: "",
            patient_bar_code: "",
            template: true,
            time_hour: 0,
            time_minute: 0,
            course_id: 1,
            chief_complaint: patient.chiefComplaint

        }
    })

    return data.id
}
