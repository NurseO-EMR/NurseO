import type { PatientChart } from "@nurse-o-core/index";
import {type PrismaClient } from "@prisma/client";
import { isEqual } from "lodash";

export async function updatePatient(db:PrismaClient, oldPatient: PatientChart, newPatient:PatientChart) {
    const prismaPromises = []
    let completed = 0;
    if(!isPatientMetaDataEqual(oldPatient, newPatient)) prismaPromises.push(updatePatientMetaData(db,newPatient))
    if(!isEqual(oldPatient.allergies, newPatient.allergies)) prismaPromises.push(...updateAllergy(db, newPatient))
    if(!isEqual(oldPatient.customOrders, newPatient.customOrders)) prismaPromises.push(...updateCustomOrders(db, newPatient))
    if(!isEqual(oldPatient.socialHistory, newPatient.socialHistory)) prismaPromises.push(...updateSocialHistory(db, newPatient))
    if(!isEqual(oldPatient.medicalHistory, newPatient.medicalHistory)) prismaPromises.push(...updateMedicalHistory(db, newPatient))
    if(!isEqual(oldPatient.notes, newPatient.notes)) prismaPromises.push(...updateNotes(db, newPatient))
    if(!isEqual(oldPatient.studentReports, newPatient.studentReports)) prismaPromises.push(...updateStudentReports(db, newPatient))
    if(!isEqual(oldPatient.flags, newPatient.flags)) prismaPromises.push(...updateFlag(db, newPatient))
    if(!isEqual(oldPatient.immunizations, newPatient.immunizations)) prismaPromises.push(...updateImmunization(db, newPatient))
    if(!isEqual(oldPatient.medicationOrders, newPatient.medicationOrders)) completed += await updateMedOrder(db, oldPatient, newPatient)

    if(prismaPromises.length > 0) {
        const results = await db.$transaction(prismaPromises)
        completed += results.length
    }

    return completed > 0
}


function isPatientMetaDataEqual(oldPatient: PatientChart, newPatient: PatientChart) {
    const o = oldPatient
    const n = newPatient
    if(o.id !== n.id) return false;
    if(o.name !== n.name) return false;
    if(o.dob !== n.dob) return false;
    if(o.gender !== n.gender) return false;
    if(o.height !== n.height) return false;
    if(o.weight !== n.weight) return false;
    if(o.labDocURL !== n.labDocURL) return false;
    if(o.imagingURL !== n.imagingURL) return false;
    if(o.diagnosis !== n.diagnosis) return false;
    if(o.courseId !== n.courseId) return false;
    if(o.time.hour !== n.time.hour || o.time.minute !== n.time.minute) return false
    return true
}

function updatePatientMetaData(db:PrismaClient, newPatient:PatientChart) {
    const {name, dob, age, gender, height, weight, time, labDocURL, imagingURL, diagnosis, courseId, id} = newPatient
    return db.patient.update({
        data: {
            name, dob, age, gender, height, weight,
            time_hour: time.hour,
            time_minute: time.minute,
            lab_doc_url: labDocURL,
            imaging_url: imagingURL,
            diagnosis,
            course_id: courseId,
            patient_bar_code: id
        },
        where: {
            id: newPatient.dbId,
        }
    })
}

function updateAllergy(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.allergy.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.allergy.createMany({
        data: patient.allergies.map(v=>{
            return {
                    name: v.name,
                    reaction: v.reaction,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}


function updateCustomOrders(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.custom_Order.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.custom_Order.createMany({
        data: patient.customOrders.map((v,i)=>{
            return {
                    order_kind: v.orderKind,
                    order_type: v.orderType,
                    time: v.time,
                    order_text: v.order,
                    patient_id: patient.dbId,
                    order_index: i,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateSocialHistory(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.social_History.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.social_History.createMany({
        data: patient.socialHistory.map(v=>{
            return {
                    history: v,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateMedicalHistory(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.medical_History.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.medical_History.createMany({
        data: patient.medicalHistory.map(v=>{
            return {
                    date: v.date,
                    title: v.title,
                    notes: v.notes,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateNotes(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.note.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.note.createMany({
        data: patient.notes.map(v=>{
            return {
                    date: v.date,
                    note: v.note,
                    report_name: v.reportName,
                    report_type: v.reportType,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateStudentReports(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.student_Report.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.student_Report.createMany({
        data: patient.studentReports.map(v=>{
            return {
                    date: v.date,
                    set_name: v.setName,
                    field_name: v.fieldName,
                    time: v.time,
                    value: v.value,
                    report_type: v.reportType,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateFlag(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.flag.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.flag.createMany({
        data: patient.flags.map(v=>{
            return {
                    name: v.name,
                    reason: v.reason,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}

function updateImmunization(db:PrismaClient, patient: PatientChart) {
    const deleteQ = db.immunization.deleteMany({where: {patient_id: patient.dbId}})
    const insertQ = db.immunization.createMany({
        data: patient.immunizations.map(v=>{
            return {
                    immunization: v,
                    patient_id: patient.dbId,
                }
        })
    })

    return [deleteQ, insertQ]
}


async function updateMedOrder(db:PrismaClient, oldPatient: PatientChart, newPatient: PatientChart) {
    const promises = []
    let completedCount = 0;

    // deleting mars
    const deleteMarQ = db.$executeRaw`DELETE FROM Mar_Record WHERE Mar_Record.med_order_id IN ( SELECT id FROM Med_Order WHERE Med_Order.patient_id = ${oldPatient.dbId} );`

    // deleting orders
    const deleteOrdersQ = db.med_Order.deleteMany({
        where: {
            patient_id: oldPatient.dbId
        }
    })

    promises.push(deleteMarQ, deleteOrdersQ)

    const deleteT = await db.$transaction(promises)
    completedCount += deleteT.length

    // adding new orders
    for(let i = 0; i<newPatient.medicationOrders.length; i++) {
        const order = newPatient.medicationOrders[i]!
        const {id, concentration, route, frequency, routine, PRNNote, notes, orderKind, orderType, time, completed, holdReason} = order
        const newOrder = await db.med_Order.create({
            data: {
                med_id: id,
                concentration, route, frequency, routine, 
                prn_note: PRNNote,
                notes,
                order_kind: orderKind,
                order_type: orderType,
                time, completed, 
                hold_reason: holdReason,
                patient_id: newPatient.dbId,
                order_index: i                
            }
        })

        
        // adding new mars
        const mar = await db.mar_Record.createMany({
            data: order.mar.map(v=>{
                const {hour, minute, dose} = v
                return {
                    hour, minute, dose,
                    med_order_id: newOrder.id

                }
            })
        })
        completedCount += mar.count
    }

    return completedCount
}
