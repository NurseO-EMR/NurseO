import type { Frequency, MarRecord, MedicationOrder, OrderKind, OrderType, Routine } from '~/core/index';
import { Prisma, type PrismaClient } from '@prisma/client';
export async function getListOfPatients(db: PrismaClient, locationId: number) {
       const patients = await db.$queryRaw<{ name: string, dob: string, id: number, timeHour: number, timeMinute: number, barcode: string }[]>`
                        SELECT Patient.name, Patient.dob, Patient.id, time_hour as timeHour, time_minute as timeMinute, patient_bar_code as barcode FROM Patient
                        INNER JOIN Course ON Patient.course_id = Course.id
                        INNER JOIN Course_Location_Information ON Course.id = Course_Location_Information.course_id
                        WHERE Patient.template=true
                        AND Course_Location_Information.location_id = ${locationId}
                        ORDER BY name;
    `

    return patients
}

export async function getPatientMedOrders(db: PrismaClient, patientId: number): Promise<MedicationOrder[]> {
    const orders = await db.$queryRaw<{ orderId: number, id: number, concentration: string, route: string, frequency: Frequency, routine: Routine, PRNNote: string, notes: string, orderKind: OrderKind, orderType: OrderType, time: string, completed: boolean, holdReason: string, brandName: string, genericName: string, narcoticCountNeeded: boolean, orderIndex: number}[]>`
                     SELECT Med_Order.id as orderId, med_id as id, concentration, route, frequency, routine, prn_note as PRNNote, notes, order_kind as orderKind, 
                            order_type as orderType, Med_Order.time, completed, hold_reason as holdReason,
                            brand_name as brandName, generic_name as genericName, narcoti_count_needed as narcoticCountNeeded,
                            order_index as orderIndex
                     FROM Med_Order 
                     INNER JOIN Medication ON Med_Order.med_id = Medication.id
                     WHERE patient_id = ${patientId}
                     ORDER BY order_index ASC;
                     `

    if(orders.length === 0) return []

    const orderIds = orders.map(o => o.orderId)

    const marRecords = await db.$queryRaw<{ medOrderId: number, dose: string, hour: number, minute: number }[]>`
                     SELECT med_order_id as medOrderId, dose, hour, minute FROM Mar_Record WHERE med_order_id in (${Prisma.join(orderIds)});
    `

    const medOrders: MedicationOrder[] = []
    for (const order of orders) {
           const medOrder: MedicationOrder = {
                  ...order,
                  mar: marRecords.filter(m => m.medOrderId == order.orderId).map(r => {
                         return {
                                hour: r.hour,
                                minute: r.minute,
                                dose: r.dose
                         } as MarRecord
                  })
           }
           medOrders.push(medOrder)
    }


    return medOrders
}

