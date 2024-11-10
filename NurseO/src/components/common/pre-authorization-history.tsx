import { Card, CardContent, CardHeader, CardTitle } from "~/components/common/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/common/ui/table"
import { Badge } from "~/components/common/ui/badge"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export function PreAuthorizationHistoryComponent() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Pre-Authorization History</h1>

      <Card>
        <CardHeader className="bg-red-700 text-white rounded-t-lg">
          <CardTitle>Pre-Authorization History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Insurance Status</TableHead>
                <TableHead>Pharmacy Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2024-03-20</TableCell>
                <TableCell>Escitalopram 10mg</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    <Clock className="w-4 h-4 mr-1 inline" />
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Awaiting Approval</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-03-15</TableCell>
                <TableCell>Lisinopril 10mg</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-1 inline" />
                    Approved
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-1 inline" />
                    Filled
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-02-28</TableCell>
                <TableCell>Metformin 500mg</TableCell>
                <TableCell>
                  <Badge variant="destructive">
                    <XCircle className="w-4 h-4 mr-1 inline" />
                    Rejected
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">N/A</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-01-10</TableCell>
                <TableCell>Atorvastatin 20mg</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-1 inline" />
                    Approved
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-1 inline" />
                    Filled
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}