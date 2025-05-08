import { Card, CardContent, CardHeader, CardTitle } from "~/components/common/ui/card"
import { User } from "lucide-react"

interface StudentInfoSectionProps {
  studentId?: string | null
  studentName?: string
  studentEmail?: string
}

export function StudentInfoSection({ studentId, studentName, studentEmail }: StudentInfoSectionProps) {
  if (!studentId && !studentName) {
    return null
  }

  return (
    <Card className="mb-6 border-slate-900/20 bg-slate-900/5 dark:border-slate-50/20 dark:bg-slate-50/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-slate-900 dark:text-slate-50" />
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studentName && (
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1 dark:text-slate-400">Name</h3>
              <p className="font-medium">{studentName}</p>
            </div>
          )}

          {studentId && (
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1 dark:text-slate-400">Student ID</h3>
              <p className="font-medium">{studentId}</p>
            </div>
          )}

          {studentEmail && (
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1 dark:text-slate-400">Email</h3>
              <p className="font-medium">{studentEmail}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
