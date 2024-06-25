
import { Prisma, type PrismaClient } from '@prisma/client';
import type { ReportInputType, ReportSet, ReportField, ReportType } from "@nurse-o-core/index";

export async function getReportSets(db: PrismaClient): Promise<ReportSet[]> {
    const sets = await db.$queryRaw<{ id: number, name: string, reportType: ReportType }[]>`SELECT id, name, report_type as reportType FROM Report_Set`

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
            type: set.reportType,
            reportFields: felids.filter(f => f.report_set_id === set.id).map(f => {
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
