import { Prisma, type PrismaClient } from '@prisma/client';
import type { ReportInputType, ReportSet, ReportField, ReportType, StudentReport } from "@nurse-o-core/index";

export async function getReportSets(db: PrismaClient, reportType: string): Promise<ReportSet[]> {
    const sets = await db.$queryRaw<{ id: number, name: string, image_url: string, image_alt: string }[]>`SELECT id, name, image_url, image_alt FROM Report_Set WHERE report_type = ${reportType}`

    const setIds = sets.map(s => s.id)
    const felids = await db.$queryRaw<{ id: number, name: string, field_type: string, add_second_field: boolean, report_set_id: number }[]>`
                                SELECT id, name, field_type, add_second_field, report_set_id FROM Report_Field WHERE report_set_id IN ( ${Prisma.join(setIds)} );`

    const fieldsIds = felids.map(f => f.id)
    const [labels, options] = await db.$transaction([
        db.$queryRaw<{ report_field_id: number, name: string }[]>`SELECT report_field_id, name FROM Report_Label WHERE report_field_id IN ( ${Prisma.join(fieldsIds)});`,
        db.$queryRaw<{ report_field_id: number, name: string }[]>`SELECT report_field_id, name FROM Report_Option WHERE report_field_id IN ( ${Prisma.join(fieldsIds)});`
    ])

    const reportSets: ReportSet[] = []

    for (const set of sets) {
        const reportSet: ReportSet = {
            name: set.name,
            image: set.image_url,
            imageAlt: set.image_alt,
            type: reportType as ReportType,
            reportFields: felids.filter(f=>f.report_set_id===set.id).map(f => {
                const output: ReportField = {
                    name: f.name,
                    fieldType: f.field_type as ReportInputType,
                    labels: labels.filter(l => l.report_field_id === f.id).map(l => l.name),
                    options: options.filter(o => o.report_field_id === f.id).map(o => o.name),
                    addSecondField: f.add_second_field
                }
                return output
            })
        }

        reportSets.push(reportSet)
    }


    return reportSets
}

export async function saveStudentsReports(db:PrismaClient, studentReport: StudentReport[], patientId: number) {
    await db.student_Report.createMany({
        data: studentReport.map(s=>{
            return {
                patient_id: patientId,
                set_name: s.setName,
                field_name: s.fieldName,
                time: s.time,
                value: s.value,
                date: s.date,
                report_type: s.reportType
            }
        })
    })
}