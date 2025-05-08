import type { PatientChart } from "~/core/Types/PatientProfile"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/common/ui/card"
import { FileText, ImageIcon } from "lucide-react"
import Link from "next/link"

interface AdditionalInfoSectionProps {
  patient: PatientChart
}

export function AdditionalInfoSection({ patient }: AdditionalInfoSectionProps) {
  return (
    <Card className="my-6">
      <CardHeader className="pb-3">
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


          {patient.labDocURL && (
            <div>
              <h3 className="text-sm font-medium mb-1">Lab Documents</h3>
              <Link
                href={patient.labDocURL}
                className="flex items-center gap-2 text-slate-900 hover:underline dark:text-slate-50"
                target="_blank"
              >
                <FileText className="h-4 w-4" />
                View Lab Documents
              </Link>
            </div>
          )}

          {patient.imagingURL && (
            <div>
              <h3 className="text-sm font-medium mb-1">Imaging</h3>
              <Link
                href={patient.imagingURL}
                className="flex items-center gap-2 text-slate-900 hover:underline dark:text-slate-50"
                target="_blank"
              >
                <ImageIcon className="h-4 w-4" />
                View Imaging Results
              </Link>
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  )
}
