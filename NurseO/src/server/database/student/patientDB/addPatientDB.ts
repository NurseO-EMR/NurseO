import type { MedicationOrder, PatientChart } from "~/core/index";
import { Prisma, type PrismaPromise, type PrismaClient } from "@prisma/client";
import { getPatientById } from "./getPatientDB";

export async function copyPatient(db: PrismaClient, p: PatientChart, numberOfTries?: number): Promise<PatientChart> {

    const { name, dob, age, gender, height, weight, time, studentId, labDocURL, imagingURL, diagnosis, courseId, id } = p

    const patient = await db.patient.create({
        data: {
            name, dob, age, gender, height, weight, diagnosis: diagnosis,
            course_id: courseId, imaging_url: imagingURL, lab_doc_url: labDocURL,
            time_hour: time.hour, time_minute: time.minute,
            student_id: studentId, patient_bar_code: id, template: false
        }
    })


    // prepared values
    const allergies = p.allergies.map(v => Prisma.sql`(${v.name}, ${v.reaction}, ${patient.id})`)
    const customOrders = p.customOrders.map(v => Prisma.sql`(${v.orderKind}, ${v.orderType}, ${v.time}, ${v.order}, ${patient.id}, ${v.orderIndex})`)
    const socialHistory = p.socialHistory.map(v => Prisma.sql`(${v}, ${patient.id})`)
    const medicalHistory = p.medicalHistory.map(v => Prisma.sql`(${v.date}, ${v.title}, ${v.notes}, ${patient.id})`)
    const notes = p.notes.map(v => Prisma.sql`(${v.date}, ${v.note}, ${v.reportName}, ${v.reportType}, ${patient.id})`)
    const immunizations = p.immunizations.map(v => Prisma.sql`(${v}, ${patient.id})`)
    const flags = p.flags.map(v => Prisma.sql`(${v.name}, ${v.reason}, ${patient.id})`)
    const studentReports = p.studentReports.map(v => Prisma.sql`(${v.setName}, ${v.fieldName}, ${v.time}, ${v.value}, ${v.date}, ${v.reportType}, ${patient.id})`)

    // transaction array 
    const transactions: PrismaPromise<number>[] = []

    if (allergies.length) transactions.push(db.$executeRaw`INSERT INTO Allergy (name, reaction, patient_id) VALUES ${Prisma.join(allergies)}`)
    if (customOrders.length) transactions.push(db.$executeRaw`INSERT INTO Custom_Order (order_kind, order_type, time, order_text, patient_id, order_index) VALUES ${Prisma.join(customOrders)}`)
    if (socialHistory.length) transactions.push(db.$executeRaw`INSERT INTO Social_History (history, patient_id) VALUES ${Prisma.join(socialHistory)}`)
    if (medicalHistory.length) transactions.push(db.$executeRaw`INSERT INTO Medical_History (date, title, notes, patient_id) VALUES ${Prisma.join(medicalHistory)}`)
    if (notes.length) transactions.push(db.$executeRaw`INSERT INTO Note (date, note, report_name, report_type, patient_id) VALUES ${Prisma.join(notes)}`)
    if (immunizations.length) transactions.push(db.$executeRaw`INSERT INTO Immunization (immunization, patient_id) VALUES ${Prisma.join(immunizations)}`)
    if (flags.length) transactions.push(db.$executeRaw`INSERT INTO Flag (name, reason, patient_id) VALUES ${Prisma.join(flags)}`)
    if (studentReports.length) transactions.push(db.$executeRaw`INSERT INTO Student_Report (set_name, field_name, time, value, date, report_type, patient_id) VALUES ${Prisma.join(studentReports)}`)

    await addMedRecord(p.medicationOrders, patient.id, db)

    if (transactions.length > 1) {
        await db.$transaction(transactions)
    } else if (transactions.length === 1) {
        await transactions[0]
    }
    

    const finalCopy = await getPatientById(db, patient.id, studentId)

    if(finalCopy) return finalCopy
    else if(numberOfTries && numberOfTries < 3) {
        return await copyPatient(db,p, (numberOfTries | 0) + 1)
    } else {
        throw new Error("Error while copying patient: " + p.dbId)
    }

}

async function addMedRecord(medOrders: MedicationOrder[], patientId: number, db: PrismaClient) {
    for (const o of medOrders) {
        const { concentration, route, frequency, routine, PRNNote, notes, orderKind, orderType, time, completed, holdReason, orderIndex } = o
        const newOrder = await db.med_Order.create({
            data: {
                med_id: o.id,
                patient_id: patientId,
                concentration, route, frequency, routine,
                prn_note: PRNNote,
                notes,
                order_kind: orderKind,
                order_type: orderType,
                time,
                completed: Boolean(completed),
                hold_reason: holdReason,
                order_index: orderIndex
            }
        })

        if (o.mar.length === 0) continue;

        await db.mar_Record.createMany({
            data: o.mar.map(v => {
                return {
                    med_order_id: newOrder.id,
                    hour: v.hour,
                    minute: v.minute,
                    dose: v.dose
                }
            })
        }).catch(console.log)
    }

}

