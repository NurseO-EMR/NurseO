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
import Card from "../EMR/Dashboard/Card/Card"

export function PreAuth() {
  return (

    <Card title="Pre Auth History">

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Insurance Status</TableHead>
            <TableHead>Pharmacy Status</TableHead>
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
              <Badge variant="destructive" className="bg-red">
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
    </Card>
  )
}